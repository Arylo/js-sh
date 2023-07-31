import test from 'ava'
import { pwd } from './index'

test('should export pwd', async (t) => {
  pwd()
  t.true(true)
})
