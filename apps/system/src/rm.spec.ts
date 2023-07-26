import path from 'path'
import fs from 'fs'
import { mockPathTest } from '../test/utils/mockPathTest'
import { rm } from './rm'

const test = mockPathTest()

test('should delete folder', (t) => {
  const testPath = path.resolve(t.context.testPath, 'a')
  rm(testPath)
  t.false(fs.existsSync(testPath))
})
