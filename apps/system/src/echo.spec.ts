import test from 'ava'
import { echo } from './echo'

test('should echo content', async (t) => {
  echo('test test')
  t.true(true)
})
