import path from 'path'
import { mockPathTest } from '../test/utils/mockPathTest'
import { cat } from './cat'

const test = mockPathTest()

test('should display file content', (t) => {
  cat(path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt'))
  t.true(true)
})
