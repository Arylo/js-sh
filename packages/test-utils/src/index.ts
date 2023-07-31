import os from 'os'
import path from 'path'
import fs from 'fs'
import ava, { TestFn } from 'ava'
import { faker } from '@faker-js/faker'
import mkdirp from 'make-dir'
import { rimrafSync } from 'rimraf'

const [START, END] = ['a', 'f']
const DEEP = 3

const rangs = [START, END].reduce<string[]>((list, _, index, rangs) => {
  if (index === 0) return list
  const [start, end] = [rangs[0].charCodeAt(0), rangs[1].charCodeAt(0)]
  for (let i = start; i <= end; i++) {
    list.push(String.fromCharCode(i))
  }
  return list
}, [])

const genFilePaths = (curPath = '', curDeep = 1) => {
  if (curDeep > DEEP) return [curPath]
  let paths = rangs.reduce<string[]>((list, word) => {
    const newName = Array(curDeep)
      .fill(word)
      .join('')
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
        path.join(...curPath, `${filename}.json`),
      )
    })
    return list
  }, [])

  return [...new Set(paths)]
}

const test = ava as TestFn<{ testPath: string }>

export const mockPathTest = ({ serial = false, once = false } = {}) => {
  const paths = genFilePaths();
  ((serial ? test.serial : test)[once ? 'before' : 'beforeEach'])((t) => {
    const testFolderName = faker.word.sample()
    const testPath = path.resolve(os.tmpdir(), testFolderName)
    fs.existsSync(testPath) && rimrafSync(testPath)
    paths.forEach((p) => {
      const filepath = path.resolve(testPath, p)
      const filename = path.basename(filepath)
      mkdirp.sync(path.dirname(filepath))
      const extname = path.extname(filepath)
      switch (extname) {
        case '.txt':
          fs.writeFileSync(filepath, filename, 'utf-8')
          break
        case '.json':
          fs.writeFileSync(filepath, JSON.stringify({ name: filename }), 'utf-8')
          break
      }
    })
    t.context.testPath = testPath
  });
  ((serial ? test.serial : test)[once ? 'after' : 'afterEach'])((t) => {
    fs.existsSync(t.context.testPath) && rimrafSync(t.context.testPath)
  })
  return test
}
