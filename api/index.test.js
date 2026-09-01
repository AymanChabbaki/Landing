import test from 'node:test'
import assert from 'node:assert/strict'
import { HEADERS } from './index.js'

test('sheet schema has unique columns in expected Meta update positions', () => {
  assert.equal(new Set(HEADERS).size, HEADERS.length)
  assert.deepEqual(HEADERS.slice(10, 15), [
    'meta_event_sent', 'meta_event_id', 'meta_event_sent_at', 'meta_error', 'meta_attempts',
  ])
})
