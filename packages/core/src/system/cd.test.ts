import os from 'os'
import test from 'ava'
import { cd } from './cd'
import { within } from '../core'
import { getStore } from '../store'

test('should cd other path', (t) => {
  const store = getStore()
  cd('..')
  t.not(__dirname, store.cwd)
})

test('should cd other path with absolute path', (t) => {
  const store = getStore()
  cd(os.tmpdir())
  t.not(__dirname, store.cwd)
  t.is(store.cwd, os.tmpdir())
})

test('should cd other path in the `within` field', (t) => {
  const parentStore = getStore()
  within(() => {
    let currentStore = getStore()
    t.is(parentStore.cwd, currentStore.cwd)
    cd('..')
    currentStore = getStore()
    t.not(parentStore.cwd, currentStore.cwd)
  })
  const nextStore = getStore()
  t.is(parentStore.cwd, nextStore.cwd)
})
