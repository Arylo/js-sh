import { notification } from '@js-sh/utils'
import { run } from '@js-sh/store'

let latestZoneId = 0

export function within(callback: () => any) {
  const nextZoneId = latestZoneId++
  notification(`[[Enter Zone ID ${nextZoneId}]]`)
  return run({ zoneId: nextZoneId }, callback)
}
