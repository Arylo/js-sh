import path from 'path'
import { getStore } from '@js-sh/store'

export function parsePath(p: string) {
  const store = getStore()
  if (path.isAbsolute(p)) {
    return p
  }
  return path.join(store.cwd, p)
}
