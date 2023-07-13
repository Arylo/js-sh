import fs from 'fs'
import { getStore } from '../store'
import { parsePath } from '../utils'
import logger from '../logger'

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
