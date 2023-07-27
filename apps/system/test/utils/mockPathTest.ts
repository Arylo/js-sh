import os from 'os'
import path from 'path'
import fs from 'fs'
import ava, { TestFn } from 'ava'
import { faker } from '@faker-js/faker'
import { rimrafSync } from 'rimraf'

const test = ava as TestFn<{ testPath: string }>

export const mockPathTest = ({ serial = false } = {}) => {
  const testFolderName = faker.word.sample()
  const testPath = path.resolve(os.tmpdir(), testFolderName)

  const paths = [
    'a/aa/aaa/aaaa.txt',
    'b/bb/bbb/bbbb.txt',
    'c/cc/ccc/cccc.txt',
  ];
  (serial ? test.serial : test).beforeEach((t) => {
    fs.existsSync(testPath) && rimrafSync(testPath)
    paths.forEach((p) => {
      const filepath = path.resolve(testPath, p)
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, path.basename(filepath), 'utf-8')
    })
    t.context.testPath = testPath
  });
  (serial ? test.serial : test).afterEach(() => {
    rimrafSync(testPath)
  })
  return test
}
