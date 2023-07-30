import os from 'os'
import path from 'path'
import fs from 'fs'
import ava, { TestFn } from 'ava'
import { faker } from '@faker-js/faker'
import mkdirp from 'make-dir'
import { rimrafSync } from 'rimraf'

const test = ava as TestFn<{ testPath: string }>

const DEEP = 3

const rangs = ['a', 'c']
  .map(w => w.charCodeAt(0))
  .reduce<string[]>((list, code, index, rangs) => {
    if (index === 0) return list
    for (let i = rangs[0]; i <= rangs[1]; i++) {
      list.push(String.fromCharCode(i))
    }
    return list
  }, [])

const genFilePaths = (curPath = '', curDeep = 1) => {
  if (curDeep > DEEP) return [curPath]
  let paths = rangs.reduce<string[]>((list, word) => {
    const newName = Array(curDeep).fill(word).join('')
    const newPath = path.join(curPath, newName)
    list.push(...genFilePaths(newPath, curDeep + 1))
    return list
  }, [])
  if (curDeep !== 1) return paths

  paths = paths.reduce<string[]>((list, p) => {
    p.split(path.sep).forEach((w, index, ps) => {
      const filename = `${w}${w[0]}`
      const curPath = ps.slice(0, index + 1)
      list.push(
        path.join(...curPath, `${filename}.txt`),
      )
    })
    return list
  }, [])

  return [...new Set(paths)]
}

export const mockPathTest = ({ serial = false } = {}) => {
  const paths = genFilePaths();
  (serial ? test.serial : test).beforeEach((t) => {
    const testFolderName = faker.word.sample()
    const testPath = path.resolve(os.tmpdir(), testFolderName)
    fs.existsSync(testPath) && rimrafSync(testPath)
    paths.forEach((p) => {
      const filepath = path.resolve(testPath, p)
      mkdirp.sync(path.dirname(filepath))
      fs.writeFileSync(filepath, path.basename(filepath), 'utf-8')
    })
    t.context.testPath = testPath
  });
  (serial ? test.serial : test).afterEach((t) => {
    rimrafSync(t.context.testPath)
  })
  return test
}
