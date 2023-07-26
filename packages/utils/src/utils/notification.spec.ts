import test from 'ava'
import { notification } from './notification'
import sinon from 'sinon'

test.beforeEach(() => {
  sinon.restore()
})

test('should echo content', (t) => {
  const m = sinon.stub(console)
  notification('test')
  t.true(m.info.called)
})
