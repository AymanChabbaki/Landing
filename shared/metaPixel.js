export function normalizeMetaPhone(value, defaultCountryCode = '212') {
  const digits = String(value || '').replace(/[^0-9]/g, '')
  const countryCode = String(defaultCountryCode).replace(/[^0-9]/g, '')
  return digits.startsWith('0') ? `${countryCode}${digits.slice(1)}` : digits
}

export function trackMetaLead({ phone, pixelId, fbq }) {
  const pixel = fbq || globalThis.window?.fbq
  if (typeof pixel !== 'function') return false
  const normalizedPhone = normalizeMetaPhone(phone)
  if (!normalizedPhone) return false

  // Meta Pixel hashes advanced-matching values in the browser before sending.
  pixel('init', pixelId, { ph: normalizedPhone })
  pixel('trackSingle', pixelId, 'Lead', {
    content_name: 'Formulaire de Pré-Validation VIP',
    status: 'submitted',
  })
  return true
}
