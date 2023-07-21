import { logger } from '@js-sh/utils'
import { getStore, run } from '@js-sh/store'

const indexes = []

export function within(callback: () => any) {
  const store = getStore()
  const nextZoneId = indexes.length + 1
  logger.info(`[[Enter Zone ID ${nextZoneId}]]`)
  return run({ ...store, zoneId: nextZoneId }, callback)
}
