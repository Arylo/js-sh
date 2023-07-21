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

export const run: typeof storage.run = (store, callback, ...args) => storage.run(store, callback, ...args)
