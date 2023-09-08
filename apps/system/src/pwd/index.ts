import { getStore } from '@js-sh/store'
import { startCommand } from '@js-sh/utils'

export function pwd(verbose = false) {
  const store = getStore()
  return startCommand(verbose ? 'pwd' : '')
    .appendResult(store.cwd)
}
