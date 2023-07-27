import { notification } from '@js-sh/utils'
import { run } from '@js-sh/store'

const indexes = []

export function within(callback: () => any) {
  const nextZoneId = indexes.length + 1
  notification(`[[Enter Zone ID ${nextZoneId}]]`)
  return run({ zoneId: nextZoneId }, callback)
}
