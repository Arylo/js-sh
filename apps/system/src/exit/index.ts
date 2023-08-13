import { notification } from '@js-sh/utils'

export const exit = (code: number, msg?: string) => {
  msg && notification(msg)
  process.exit(code)
}
