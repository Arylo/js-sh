import { getStore } from '@js-sh/store'

export function pwd() {
  const store = getStore()
  return store.cwd
}
