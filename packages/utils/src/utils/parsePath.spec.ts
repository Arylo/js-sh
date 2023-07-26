import path from 'path'
import os from 'os'
import test from 'ava'
import { parsePath } from './parsePath'
import { getStore } from '@js-sh/store'

test('should return absolute path if the param is an isAbsolute path', (t) => {
  const source = os.tmpdir()
  const target = parsePath(source)
  t.deepEqual(source, target)
})

test('should return absolute path if the next path', (t) => {
  const store = getStore()
  const next = 'next'
  const source = path.resolve(store.cwd, next)
  const target = parsePath(next)
  t.deepEqual(source, target)
})
