const STORAGE_KEY = 'ultex_submission_browser_v1'
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// A repeat-browser signal, not a verified identity or an anti-bot control.
// The French and Arabic forms share this key when hosted on the same origin.
export function getSubmissionMetadata(formLanguage, browser = window) {
  let visitorId = ''
  let visitorIdStatus = 'unavailable'
  try {
    const now = Date.now()
    let saved
    try {
      saved = JSON.parse(browser.localStorage.getItem(STORAGE_KEY))
    } catch {
      // Corrupt or unavailable storage must not prevent a lead submission.
    }
    if (saved && UUID.test(saved.id) && Number.isFinite(saved.createdAt)
      && saved.createdAt <= now && now - saved.createdAt < MAX_AGE_MS) {
      visitorId = saved.id
      visitorIdStatus = 'stored'
    } else {
      visitorId = browser.crypto.randomUUID()
      visitorIdStatus = 'submission_only'
      browser.localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: visitorId, createdAt: now }))
      visitorIdStatus = 'stored'
    }
  } catch {
    // If persistence is blocked, explicitly mark the ID as submission-only.
  }
  return { visitorId, visitorIdStatus, submittedAt: new Date().toISOString(), formLanguage }
}
