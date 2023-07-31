import test from 'ava'
import { sleep } from './index'

test('should wait 1s', async (t) => {
  const startAt = Date.now()
  await sleep(1000)
  const endAt = Date.now()
  t.true(endAt - startAt >= 1000)
})
