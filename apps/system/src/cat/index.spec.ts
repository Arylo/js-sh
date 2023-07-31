import path from 'path'
import { mockPathTest } from '@js-sh/test-utils'
import { cat } from './index'

const test = mockPathTest()

test('should display file content', (t) => {
  cat(path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt'))
  t.true(true)
})
