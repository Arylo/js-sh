import { startCommand } from '@js-sh/utils'

export const exit = (code: number, msg?: string) => {
  startCommand('exit', code)
    .appendResult(undefined, msg)
  process.exit(code)
}
