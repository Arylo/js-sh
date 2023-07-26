import test from 'ava'
import lodash from 'lodash'
import * as m from './index'

test('should export features', (t) => {
  t.true(Object.keys(m).length > 0)
})

test('should support default export or independent export', (t) => {
  const defExports = m.default
  const oldExports = lodash.omit(m, ['default'])
  t.deepEqual(defExports, oldExports)
})
