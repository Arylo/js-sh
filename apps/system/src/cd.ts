import fs from 'fs'
import { getStore } from '@js-sh/store'
import { parsePath, logger } from '@js-sh/utils'

export function cd(p: string) {
  const store = getStore()
  const nextPath = parsePath(p)
  if (!fs.existsSync(nextPath)) {
    return logger.error(`${p} is not exist`)
  }
  if (!fs.statSync(nextPath).isDirectory()) {
    return logger.error(`${p} is not a directory`)
  }
  logger.info(`cd ${p}`)
  store.cwd = nextPath
}
