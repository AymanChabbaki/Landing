import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { getSubmissionMetadata } from './submissionMetadata.js'

function makeBrowser(initial = null) {
  let value = initial
  return {
    crypto: { randomUUID },
    localStorage: { getItem: () => value, setItem: (_key, next) => { value = next } },
  }
}

test('reuses the browser ID across languages and reloads', () => {
  const browser = makeBrowser()
  const first = getSubmissionMetadata('fr', browser)
  const second = getSubmissionMetadata('ar', { ...browser })
  assert.equal(first.visitorId, second.visitorId)
  assert.equal(second.visitorIdStatus, 'stored')
  assert.equal(second.formLanguage, 'ar')
  assert.ok(Number.isFinite(Date.parse(second.submittedAt)))
})

test('separate browsers get different IDs', () => {
  assert.notEqual(getSubmissionMetadata('fr', makeBrowser()).visitorId,
    getSubmissionMetadata('fr', makeBrowser()).visitorId)
})

test('corrupt and expired entries are replaced', () => {
  for (const initial of ['bad json', JSON.stringify({ id: randomUUID(), createdAt: 0 })]) {
    const result = getSubmissionMetadata('fr', makeBrowser(initial))
    assert.equal(result.visitorIdStatus, 'stored')
    assert.ok(result.visitorId)
  }
})

test('blocked storage does not stop submission or claim persistence', () => {
  const browser = makeBrowser()
  Object.defineProperty(browser, 'localStorage', { get() { throw new Error('blocked') } })
  assert.equal(getSubmissionMetadata('fr', browser).visitorIdStatus, 'submission_only')
})

test('unavailable crypto and storage do not stop submission', () => {
  const result = getSubmissionMetadata('fr', {})
  assert.equal(result.visitorId, '')
  assert.equal(result.visitorIdStatus, 'unavailable')
})
