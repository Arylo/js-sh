import { getStore } from '@js-sh/store'
import { globSync } from 'glob'
import { parsePath } from './parsePath'

export const parseGlobPath = (p: string) => {
  const store = getStore()
  return globSync(p, { cwd: store.cwd })
    .map((p) => parsePath(p))
}
