import { logger } from '@js-sh/utils'
import { getStore } from '@js-sh/store'

export function pwd() {
  const store = getStore()
  logger.info('pwd')
  console.log(store.cwd)
}
