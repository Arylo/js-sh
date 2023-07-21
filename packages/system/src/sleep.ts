import { logger } from '@js-sh/utils'

export async function sleep(time: number) {
  logger.info(`sleep ${time}`)
  return new Promise(resolve => setTimeout(resolve, time))
}
