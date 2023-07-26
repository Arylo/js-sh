import test from 'ava'
import sinon from 'sinon'
import { getStore, runNext } from '@js-sh/store'
import { logger } from './logger'

test.beforeEach(() => {
  sinon.restore()
})

test.serial('should echo content', (t) => {
  runNext(() => {
    const mockFn = sinon.stub(console, 'log')
    logger.info('test')
    t.true(mockFn.calledOnce)
  })
})

test.serial('should echo content if the verbose value is false', (t) => {
  runNext(() => {
    const store = getStore()
    store.verbose = false
    const mockFn = sinon.stub(console, 'log')
    logger.info('test')
    t.false(mockFn.calledOnce)
  })
})

test.serial('should echo error conttent', (t) => {
  runNext(() => {
    const mockFn = sinon.stub(console, 'error')
    logger.error('test')
    t.true(mockFn.calledOnce)
  })
})

test.serial('should echo error content if the verbose value is false', (t) => {
  runNext(() => {
    const store = getStore()
    store.verbose = false
    const mockFn = sinon.stub(console, 'error')
    logger.error('error')
    t.false(mockFn.calledOnce)
  })
})
