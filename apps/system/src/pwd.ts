import { logger, notification } from '@js-sh/utils'
import { getStore } from '@js-sh/store'

export function pwd() {
  const store = getStore()
  logger.info('pwd')
  notification(store.cwd)
  return store.cwd
}
