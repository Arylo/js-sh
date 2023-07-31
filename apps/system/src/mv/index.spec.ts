import fs from 'fs'
import path from 'path'
import { run } from '@js-sh/store'
import { mockPathTest } from '@js-sh/test-utils'
import { mv } from './index'

const test = mockPathTest()

test.serial('should move file to other file', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'abc.txt')
    t.true(fs.existsSync(targetPath))
    t.false(fs.existsSync(resultPath))
    const targetContent = fs.readFileSync(targetPath, 'utf-8')

    mv('a/aa.txt', 'abc.txt')

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    t.false(fs.existsSync(targetPath))
    t.true(fs.existsSync(resultPath))
    t.deepEqual(targetContent, resultContent)
  })
})

test.serial('should move file into other folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'aa.txt')
    t.true(fs.existsSync(targetPath))
    t.false(fs.existsSync(resultPath))
    const targetContent = fs.readFileSync(targetPath, 'utf-8')

    mv('a/aa.txt', './')

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    t.false(fs.existsSync(targetPath))
    t.true(fs.existsSync(resultPath))
    t.deepEqual(targetContent, resultContent)
  })
})
