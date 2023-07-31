import path from 'path'
import { mockPathTest } from '@js-sh/test-utils'
import { run } from '@js-sh/store'
import { analysisSourceNTargetPath } from './utils'
import { MoveNCopyPathStat } from './consts'

const test = mockPathTest({ once: true })

test('should return the case of the file to the file', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa.txt'),
      }],
      target: {
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'abc/abc.txt'),
      },
    }
    const result = analysisSourceNTargetPath('a/aa.txt', 'abc/abc.txt')
    t.deepEqual(target, result)
  })
})

test('should return the case of the files to the folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa.txt'),
      }, {
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa.json'),
      }],
      target: {
        stat: MoveNCopyPathStat.UNDER_FOLDER,
        path: path.resolve(t.context.testPath, 'abc'),
      },
    }
    const result = analysisSourceNTargetPath(['a/aa.txt', 'a/aa.json'], 'abc')
    t.deepEqual(target, result)
  })
})

test('should return the case of the files with difference folders to the folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa.txt'),
      }, {
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'b/bb.txt'),
      }],
      target: {
        stat: MoveNCopyPathStat.UNDER_FOLDER,
        path: path.resolve(t.context.testPath, 'abc'),
      },
    }
    const result = analysisSourceNTargetPath(['a/aa.txt', 'b/bb.txt'], 'abc')
    t.deepEqual(target, result)
  })
})

test('should return the case of the file into the folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa.txt'),
      }],
      target: {
        stat: MoveNCopyPathStat.UNDER_FOLDER,
        path: path.resolve(t.context.testPath, 'abc/'),
      },
    }
    const result = analysisSourceNTargetPath('a/aa.txt', 'abc/')
    t.deepEqual(target, result)
  })
})

test('should return the case of the folder to the folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FOLDER,
        path: path.resolve(t.context.testPath, 'a'),
      }],
      target: {
        stat: MoveNCopyPathStat.FOLDER,
        path: path.resolve(t.context.testPath, 'abc'),
      },
    }
    const result = analysisSourceNTargetPath('a', 'abc')
    t.deepEqual(target, result)
  })
})

test('should return the case of the folder into the folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FOLDER,
        path: path.resolve(t.context.testPath, 'a'),
      }],
      target: {
        stat: MoveNCopyPathStat.UNDER_FOLDER,
        path: path.resolve(t.context.testPath, 'abc'),
      },
    }
    const result = analysisSourceNTargetPath('a', 'abc/')
    t.deepEqual(target, result)
  })
})

test('should return the case of the folders to the folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FOLDER,
        path: path.resolve(t.context.testPath, 'a'),
      }, {
        stat: MoveNCopyPathStat.FOLDER,
        path: path.resolve(t.context.testPath, 'b'),
      }],
      target: {
        stat: MoveNCopyPathStat.UNDER_FOLDER,
        path: path.resolve(t.context.testPath, 'abc'),
      },
    }
    const result = analysisSourceNTargetPath(['a', 'b'], 'abc')
    t.deepEqual(target, result)
  })
})

test('should return the case of the files using glob to the folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt'),
      }, {
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.json'),
      }],
      target: {
        stat: MoveNCopyPathStat.UNDER_FOLDER,
        path: path.resolve(t.context.testPath, 'abc'),
      },
    }
    const result = analysisSourceNTargetPath('a/aa/aaa/*', 'abc')
    t.deepEqual(target, result)
  })
})

test('should return the case of the globs to the folder', (t) => {
  run({ cwd: t.context.testPath }, () => {
    const target = {
      sources: [{
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.txt'),
      }, {
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'a/aa/aaa/aaaa.json'),
      }, {
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'b/bb/bbb/bbbb.txt'),
      }, {
        stat: MoveNCopyPathStat.FILE,
        path: path.resolve(t.context.testPath, 'b/bb/bbb/bbbb.json'),
      }],
      target: {
        stat: MoveNCopyPathStat.UNDER_FOLDER,
        path: path.resolve(t.context.testPath, 'abc'),
      },
    }
    const result = analysisSourceNTargetPath(['a/aa/aaa/*', 'b/bb/bbb/*'], 'abc')
    t.deepEqual(target, result)
  })
})
