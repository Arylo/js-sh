import fs from 'fs'
import path from 'path'
import sinon from 'sinon'
import { run } from '@js-sh/store'
import { mockPathTest } from '@js-sh/test-utils'
import { moveFile, moveMap } from './moveFile'

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
    const targetStat = fs.statSync(targetPath)

    moveMap.copy(targetPath, resultPath)

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    const resultStat = fs.statSync(resultPath)

    t.false(fs.existsSync(targetPath))
    t.true(fs.existsSync(resultPath))
    t.deepEqual(targetContent, resultContent)
    t.deepEqual(targetStat.mtime, resultStat.mtime)
  })
})

test.beforeEach(() => {
  sinon.restore()
})

test('should downgrade move using copy method', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'abc.txt')

    const rename = sinon.stub(moveMap, 'rename')
    const copy = sinon.stub(moveMap, 'copy')

    rename.throws(new Error('EXDEV'))

    moveFile(targetPath, resultPath)
    t.true(copy.called)
  })
})
