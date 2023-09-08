import { startCommand } from '@js-sh/utils'

export async function sleep(time: number) {
  startCommand('sleep', time)
  return new Promise(resolve => setTimeout(resolve, time))
}
