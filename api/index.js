import express from 'express'
import { createHash } from 'node:crypto'
import { google } from 'googleapis'

export const HEADERS = [
  'submitted_at', 'nom', 'produit', 'pays', 'whatsapp', 'browser_id',
  'id_status', 'browser_submission_time', 'language', 'status',
  'meta_event_sent', 'meta_event_id', 'meta_event_sent_at', 'meta_error',
  'meta_attempts', 'client_ip', 'user_agent', 'fbp', 'fbc',
]

const app = express()
app.set('trust proxy', true)
app.use(express.json({ limit: '20kb' }))

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

function sheetsClient() {
  const credentials = JSON.parse(requiredEnv('GOOGLE_SERVICE_ACCOUNT_JSON'))
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

function sheetRange(suffix = '') {
  const title = (process.env.GOOGLE_SHEET_TAB || 'Sheet1').replaceAll("'", "''")
  return `'${title}'${suffix ? `!${suffix}` : ''}`
}

function clean(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function normalizePhone(value) {
  const digits = clean(value, 50).replace(/[^0-9]/g, '')
  const countryCode = clean(process.env.META_DEFAULT_COUNTRY_CODE || '212', 5).replace(/[^0-9]/g, '')
  return digits.startsWith('0') ? `${countryCode}${digits.slice(1)}` : digits
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function rowObject(headers, row) {
  return Object.fromEntries(headers.map((header, index) => [header, row[index] ?? '']))
}

export function getClientIp(req) {
  const cloudflareIp = clean(req.get?.('cf-connecting-ip'), 100)
  const forwardedIp = clean(req.get?.('x-forwarded-for'), 500).split(',')[0].trim()
  const realIp = clean(req.get?.('x-real-ip'), 100)
  return (cloudflareIp || forwardedIp || realIp || clean(req.ip, 100)).replace(/^::ffff:/, '')
}

async function ensureHeaders(sheets, spreadsheetId) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetRange('1:1'),
  })
  const current = response.data.values?.[0] || []
  if (current.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: sheetRange('A1'),
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    })
    return
  }
  const missing = HEADERS.filter((header) => !current.includes(header))
  const isLegacyHeader = current.length <= HEADERS.length && missing.length === HEADERS.length
  if (current.length <= 9 || isLegacyHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: sheetRange('A1'),
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    })
    return
  }
  if (missing.length) throw new Error(`Sheet is missing columns: ${missing.join(', ')}`)
}

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/leads', async (req, res) => {
  try {
    const data = req.body || {}
    const required = ['nom', 'produit', 'pays', 'whatsapp']
    if (required.some((field) => !clean(data[field]))) {
      return res.status(400).json({ error: 'Required form fields are missing.' })
    }

    const spreadsheetId = requiredEnv('GOOGLE_SPREADSHEET_ID')
    const sheets = sheetsClient()
    await ensureHeaders(sheets, spreadsheetId)
    const values = [
      new Date().toISOString(), clean(data.nom), clean(data.produit), clean(data.pays),
      clean(data.whatsapp, 50), clean(data.visitorId, 100), clean(data.visitorIdStatus, 30),
      clean(data.submittedAt, 50), clean(data.formLanguage, 5), 'New', false, '', '', '', 0,
      getClientIp(req), clean(req.get('user-agent'), 500), clean(data.fbp, 200), clean(data.fbc, 200),
    ]
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetRange('A:A'),
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [values] },
    })
    return res.status(201).json({ status: 'success' })
  } catch (error) {
    console.error('Lead submission failed:', error)
    return res.status(500).json({ error: 'Unable to save the submission.' })
  }
})

async function sendMetaEvent(lead, eventId) {
  const pixelId = requiredEnv('META_PIXEL_ID')
  const token = requiredEnv('META_ACCESS_TOKEN')
  const graphVersion = process.env.META_GRAPH_VERSION || 'v23.0'
  const userData = {}
  const phone = normalizePhone(lead.whatsapp)
  if (phone) userData.ph = [sha256(phone)]
  if (lead.user_agent) userData.client_user_agent = lead.user_agent
  if (lead.fbp) userData.fbp = lead.fbp
  if (lead.fbc) userData.fbc = lead.fbc

  const response = await fetch(`https://graph.facebook.com/${graphVersion}/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [{
        event_name: process.env.META_EVENT_NAME || 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: process.env.PUBLIC_SITE_URL,
        user_data: userData,
        custom_data: { lead_status: 'qualified' },
      }],
      ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
    }),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok || result.error) throw new Error(result.error?.message || `Meta returned ${response.status}`)
  return result
}

async function updateMetaColumns(sheets, spreadsheetId, rowNumber, values) {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: sheetRange(`K${rowNumber}:O${rowNumber}`),
    valueInputOption: 'RAW',
    requestBody: { values: [values] },
  })
}

app.all('/api/process-qualified', async (req, res) => {
  if (!process.env.CRON_SECRET || req.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const spreadsheetId = requiredEnv('GOOGLE_SPREADSHEET_ID')
    const sheets = sheetsClient()
    await ensureHeaders(sheets, spreadsheetId)
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: sheetRange('A:S') })
    const rows = response.data.values || []
    const headers = rows[0] || []
    const results = []

    for (let index = 1; index < rows.length; index += 1) {
      const lead = rowObject(headers, rows[index])
      if (clean(lead.status).toLowerCase() !== 'qualified' || String(lead.meta_event_sent).toLowerCase() === 'true') continue
      const rowNumber = index + 1
      const eventId = lead.meta_event_id || `qualified-${spreadsheetId}-${rowNumber}`
      const attempts = Number.parseInt(lead.meta_attempts, 10) || 0
      try {
        await sendMetaEvent(lead, eventId)
        await updateMetaColumns(sheets, spreadsheetId, rowNumber, [true, eventId, new Date().toISOString(), '', attempts + 1])
        results.push({ row: rowNumber, sent: true })
      } catch (error) {
        await updateMetaColumns(sheets, spreadsheetId, rowNumber, [false, eventId, '', clean(error.message, 500), attempts + 1])
        results.push({ row: rowNumber, sent: false })
      }
    }
    return res.json({ processed: results.length, results })
  } catch (error) {
    console.error('Qualified lead processing failed:', error)
    return res.status(500).json({ error: 'Unable to process qualified leads.' })
  }
})

export default app
