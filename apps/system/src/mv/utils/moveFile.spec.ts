import fs from 'fs'
import path from 'path'
import { run } from '@js-sh/store'
import { mockPathTest } from '@js-sh/test-utils'
import { moveMap } from './moveFile'

const test = mockPathTest()

test('using rename method', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'abc.txt')
    t.true(fs.existsSync(targetPath))
    t.false(fs.existsSync(resultPath))

    const targetContent = fs.readFileSync(targetPath, 'utf-8')

    moveMap.rename(targetPath, resultPath)

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    t.false(fs.existsSync(targetPath))
    t.true(fs.existsSync(resultPath))
    t.deepEqual(targetContent, resultContent)
  })
})

test('using copy and delete method', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'abc.txt')
    t.true(fs.existsSync(targetPath))
    t.false(fs.existsSync(resultPath))

    const targetContent = fs.readFileSync(targetPath, 'utf-8')

    moveMap.copy(targetPath, resultPath)

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    t.false(fs.existsSync(targetPath))
    t.true(fs.existsSync(resultPath))
    t.deepEqual(targetContent, resultContent)
  })
})
