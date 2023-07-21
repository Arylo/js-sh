import fs from 'fs'
import { getStore } from '@js-sh/store'
import { parsePath, logger } from '@js-sh/utils'

export function cd(p: string) {
  const store = getStore()
  const nextPath = parsePath(p)
  if (!fs.existsSync(nextPath)) {
    // TODO
  }
  if (!fs.statSync(nextPath).isDirectory()) {
    // TODO
  }
  logger.info(`cd ${p}`)
  store.cwd = nextPath
}
