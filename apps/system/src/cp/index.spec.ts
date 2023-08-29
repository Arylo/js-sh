import fs from 'fs'
import path from 'path'
import { run } from '@js-sh/store'
import { mockPathTest } from '@js-sh/test-utils'
import { cp } from './index'
import { parseGlobPath } from '@js-sh/utils'

const test = mockPathTest()

test.serial('should copy file to other file', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'abc.txt')
    t.false(fs.existsSync(resultPath))

    cp('a/aa.txt', 'abc.txt')

    const target = fs.readFileSync(targetPath, 'utf-8')
    const result = fs.readFileSync(resultPath, 'utf-8')
    t.true(fs.existsSync(resultPath))
    t.deepEqual(target, result)
  })
})

test.serial('should copy file into other folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'aa.txt')
    t.false(fs.existsSync(resultPath))

    cp('a/aa.txt', './')

    const target = fs.readFileSync(targetPath, 'utf-8')
    const result = fs.readFileSync(resultPath, 'utf-8')
    t.true(fs.existsSync(resultPath))
    t.deepEqual(target, result)
  })
})

test.serial('should copy folder to other folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a')
    const resultPath = path.resolve(t.context.testPath, 'abc')
    t.false(fs.existsSync(resultPath))

    cp('a', 'abc')

    parseGlobPath('a/**/*.txt')
      .map(item => path.relative(targetPath, item))
      .forEach((item) => {
        const target = fs.readFileSync(path.resolve(targetPath, item), 'utf-8')
        const result = fs.readFileSync(path.resolve(resultPath, item), 'utf-8')
        t.true(fs.existsSync(resultPath))
        t.deepEqual(target, result)
      })
  })
})

test.serial('should copy folder into other folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa/aaa')
    const resultPath = path.resolve(t.context.testPath, 'abc')
    t.false(fs.existsSync(resultPath))

    cp('a/aa/aaa', 'abc/')
    t.true(fs.existsSync(path.resolve(resultPath, 'aaa')))

    parseGlobPath('a/aa/aaa/**/*.txt')
      .map(item => path.relative(targetPath, item))
      .forEach((item) => {
        const target = fs.readFileSync(path.resolve(targetPath, item), 'utf-8')
        const result = fs.readFileSync(path.resolve(resultPath, 'aaa', item), 'utf-8')
        t.true(fs.existsSync(resultPath))
        t.deepEqual(target, result)
      })
  })
})

test.serial('should not copy file to other exist file for default options', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'a/aa.json')

    const targetContent = fs.readFileSync(targetPath, 'utf-8')
    const oldContent = fs.readFileSync(resultPath, 'utf-8')
    t.notDeepEqual(targetContent, oldContent)

    cp('a/aa.txt', 'a/aa.json')

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    t.notDeepEqual(targetContent, resultContent)
  })
})

test.serial('should not copy file to other exist file', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'a/aa.json')

    const targetContent = fs.readFileSync(targetPath, 'utf-8')
    const oldContent = fs.readFileSync(resultPath, 'utf-8')
    t.notDeepEqual(targetContent, oldContent)

    cp('a/aa.txt', 'a/aa.json', { force: false })

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    t.notDeepEqual(targetContent, resultContent)
  })
})

test.serial('should force copy file to other file', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'a/aa.json')

    const targetContent = fs.readFileSync(targetPath, 'utf-8')
    const oldContent = fs.readFileSync(resultPath, 'utf-8')
    t.notDeepEqual(targetContent, oldContent)

    cp('a/aa.txt', 'a/aa.json', { force: true })

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    t.deepEqual(targetContent, resultContent)
  })
})

test.serial('should force copy file to other file using force modifier', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const targetPath = path.resolve(t.context.testPath, 'a/aa.txt')
    const resultPath = path.resolve(t.context.testPath, 'a/aa.json')

    const targetContent = fs.readFileSync(targetPath, 'utf-8')
    const oldContent = fs.readFileSync(resultPath, 'utf-8')
    t.notDeepEqual(targetContent, oldContent)

    cp.force('a/aa.txt', 'a/aa.json')

    const resultContent = fs.readFileSync(resultPath, 'utf-8')
    t.deepEqual(targetContent, resultContent)
  })
})
