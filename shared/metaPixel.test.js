import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeMetaPhone, trackMetaLead } from './metaPixel.js'

test('normalizes common Moroccan phone formats', () => {
  assert.equal(normalizeMetaPhone('06 12 34 56 78'), '212612345678')
  assert.equal(normalizeMetaPhone('+212 6 12 34 56 78'), '212612345678')
})

test('initializes advanced matching before tracking the lead', () => {
  const calls = []
  const sent = trackMetaLead({ phone: '0612345678', pixelId: '1381885053982368', fbq: (...args) => calls.push(args) })
  assert.equal(sent, true)
  assert.deepEqual(calls[0], ['init', '1381885053982368', { ph: '212612345678' }])
  assert.equal(calls[1][0], 'trackSingle')
})

test('does nothing without a phone or loaded pixel', () => {
  assert.equal(trackMetaLead({ phone: '', pixelId: '1', fbq: () => {} }), false)
  assert.equal(trackMetaLead({ phone: '0612345678', pixelId: '1', fbq: undefined }), false)
})
