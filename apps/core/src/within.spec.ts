import test from 'ava'
import { spy } from  'sinon'
import { within } from './within'

test('should call the function', (t) => {
  const callback = spy()
  within(callback)
  t.true(callback.called)
})

test('should call the async function', async (t) => {
  const callback = spy()
  await within(async () => callback())
  t.true(callback.called)
})
