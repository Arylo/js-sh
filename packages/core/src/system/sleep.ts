import { setTimeout } from 'timers/promises'
import logger from '../logger'

export async function sleep(time: number) {
  logger.info(`sleep ${time}`)
  await setTimeout(time)
}
