import test from 'ava'
import { pwd } from './pwd'

test('should export pwd', async (t) => {
  pwd()
  t.true(true)
})
