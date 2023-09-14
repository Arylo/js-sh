import path from 'path'
import fs from 'fs'
import { mockPathTest } from '@js-sh/test-utils'
import { mkdir } from './index'

const test = mockPathTest()

test('should make a folder', (t) => {
  const testPath = path.resolve(t.context.testPath, 'a/aa/aaa/aaaa')
  t.true(mkdir(testPath))
  t.true(fs.existsSync(testPath))
  t.true(fs.statSync(testPath).isDirectory())
})

test('should make a existed folder', (t) => {
  const testPath = path.resolve(t.context.testPath, 'a')
  t.true(mkdir(testPath))
  t.true(fs.existsSync(testPath))
  t.true(fs.statSync(testPath).isDirectory())
})

test('should cannot make a folder but it is file', (t) => {
  const testPath = path.resolve(t.context.testPath, 'a/aa.txt')
  t.false(mkdir(testPath))
  t.true(fs.statSync(testPath).isFile())
})
