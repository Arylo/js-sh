import test from 'ava'
import * as m from './index'

test('should export features', (t) => {
  t.true(Object.keys(m).length > 0)
})
