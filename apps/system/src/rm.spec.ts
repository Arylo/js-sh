import path from 'path'
import fs from 'fs'
import { mockPathTest } from '@js-sh/test-utils'
import { rm } from './rm'
import { run } from '@js-sh/store'

const test = mockPathTest({ serial: true })

test.serial('should delete folder', (t) => {
  const testPath = path.resolve(t.context.testPath, 'a')
  t.true(fs.existsSync(testPath))
  rm(testPath)
  t.false(fs.existsSync(testPath))
})

test.serial('should delete file', (t) => {
  const testPath = path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt')
  t.true(fs.existsSync(testPath))
  rm(testPath)
  t.false(fs.existsSync(testPath))
})

test.serial('should delete folders using glob', (t) => {
  const testPath = path.resolve(t.context.testPath, '*')
  t.true(fs.existsSync(path.resolve(t.context.testPath, 'a')))
  rm(testPath)
  t.false(fs.existsSync(path.resolve(t.context.testPath, 'a')))
})

test.serial('should delete files using glob', (t) => {
  const testPath = path.resolve(t.context.testPath, '**/*.txt')
  t.true(fs.existsSync(path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt')))
  rm(testPath)
  t.false(fs.existsSync(path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt')))
})

test.serial('should delete folder in current folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const testPath = 'a'
    t.true(fs.existsSync(path.resolve(t.context.testPath, testPath)))
    rm(testPath)
    t.false(fs.existsSync(path.resolve(t.context.testPath, testPath)))
  })
})

test.serial('should delete file in current folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const testPath = 'a/aa/aaa/aaaa.txt'
    t.true(fs.existsSync(path.resolve(t.context.testPath, testPath)))
    rm(testPath)
    t.false(fs.existsSync(path.resolve(t.context.testPath, testPath)))
  })
})

test.serial('should delete folders using glob in current folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const testPath = '*'
    t.true(fs.existsSync(path.resolve(t.context.testPath, 'a')))
    rm(testPath)
    t.false(fs.existsSync(path.resolve(t.context.testPath, 'a')))
  })
})

test.serial('should delete files using glob in current folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const testPath = '**/*.txt'
    t.true(fs.existsSync(path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt')))
    rm(testPath)
    t.false(fs.existsSync(path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt')))
  })
})
