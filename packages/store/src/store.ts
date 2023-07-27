import { AsyncLocalStorage } from 'async_hooks'

export type Store = {
  [processCwd]: string
  cwd: string
  verbose: boolean
  zoneId: number
}

const storage = new AsyncLocalStorage<Store>()

const processCwd = Symbol('processCwd')

const defaults: Store = {
  [processCwd]: process.cwd(),
  cwd: process.cwd(),
  verbose: true,
  zoneId: 0,
}

export function getStore() {
  return storage.getStore() || defaults
}

type RunFn = <R>(store: Partial<Store>, callback: (...args: any[]) => R, ...args: any[]) => R
export const run: RunFn = (store, callback, ...args) => storage.run({ ...getStore(), ...store }, callback, ...args)

export const runNext = <R>(callback: (...args: any[]) => R, ...args: any[]) => run({ }, callback, ...args)
