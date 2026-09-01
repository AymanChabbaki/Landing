import test from 'node:test'
import assert from 'node:assert/strict'
import { getClientIp, HEADERS } from './index.js'

test('sheet schema has unique columns in expected Meta update positions', () => {
  assert.equal(new Set(HEADERS).size, HEADERS.length)
  assert.deepEqual(HEADERS.slice(10, 15), [
    'meta_event_sent', 'meta_event_id', 'meta_event_sent_at', 'meta_error', 'meta_attempts',
  ])
})

test('uses the visitor IP provided by Cloudflare before proxy addresses', () => {
  const headers = {
    'cf-connecting-ip': '196.64.1.2',
    'x-forwarded-for': '172.68.234.12, 10.0.0.1',
  }
  const req = { get: (name) => headers[name], ip: '10.0.0.1' }
  assert.equal(getClientIp(req), '196.64.1.2')
})

test('uses the first forwarded IP when Cloudflare is absent', () => {
  const req = { get: (name) => name === 'x-forwarded-for' ? '196.64.1.2, 10.0.0.1' : '', ip: '10.0.0.1' }
  assert.equal(getClientIp(req), '196.64.1.2')
})
