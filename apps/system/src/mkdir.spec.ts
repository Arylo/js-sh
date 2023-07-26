import path from 'path'
import fs from 'fs'
import { mockPathTest } from '../test/utils/mockPathTest'
import { mkdir } from './mkdir'

const test = mockPathTest()

test('should make folder', (t) => {
  const testPath = path.resolve(t.context.testPath, 'a/aa/aaa/aaaa')
  mkdir(testPath)
  t.true(fs.existsSync(testPath))
  t.true(fs.statSync(testPath).isDirectory())
})
