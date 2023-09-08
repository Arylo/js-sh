import { startCommand } from '@js-sh/utils'

export function echo(...args: string[]) {
  startCommand().appendResult(undefined, args)
}
