import { mockPathTest } from '@js-sh/test-utils'
import { ls } from './index'
import { run } from '@js-sh/store'

const test = mockPathTest({ once: true })

test.serial('should return current filename if the param is filename', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const filelist = ls('a/aa.txt')
    t.deepEqual(filelist, [`${t.context.testPath}/a/aa.txt`])
  })
})

test.serial('should return file/folder list in the current folder  if the param is empty', (t) => {
  const target = [
    'a/',
    'b/',
    'c/',
    'd/',
    'e/',
    'f/',
  ].map((name) => `${t.context.testPath}/${name}`)
  run({ cwd: t.context.testPath }, () => {
    const result = ls()
    t.deepEqual(target, result)
  })
})

test.serial('should return file/folder list if the param is foldername', (t) => {
  const target = [
    'aa.json',
    'aa.txt',
    'aa/',
    'bb/',
    'cc/',
    'dd/',
    'ee/',
    'ff/',
  ].map((name) => `${t.context.testPath}/a/${name}`)
  run({ cwd: t.context.testPath }, () => {
    const result = ls('a')
    t.deepEqual(target, result)
  })
})

test.serial('should return file list if the param is glob', (t) => {
  const target = [
    'aa.json',
    'aa.txt',
  ].map((name) => `${t.context.testPath}/a/${name}`)
  run({ cwd: t.context.testPath }, () => {
    const result = ls('a/aa.*')
    t.deepEqual(target, result)
  })
})

test.serial('should return file/folder list if the param is glob', (t) => {
  const target = [
    ...[
      'aaaa.json',
      'aaaa.txt',
    ].map((name) => `${t.context.testPath}/a/aa/aaa/${name}`),
    ...[
      'bbbb.json',
      'bbbb.txt',
    ].map((name) => `${t.context.testPath}/a/aa/bbb/${name}`),
  ]
  run({ cwd: t.context.testPath }, () => {
    const result = ls('a/aa/{aaa,bbb}')
    t.deepEqual(target, result)
  })
})
