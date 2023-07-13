import logger from '../logger'
import { getStore } from '../store'

export function pwd() {
  const store = getStore()
  logger.info('pwd')
  console.log(store.cwd)
}
