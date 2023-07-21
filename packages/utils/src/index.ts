import * as utils from './utils'
import logger from './logger'

export * from './utils'
export { default as logger } from './logger'
export default {
  logger,
  ...utils,
}
