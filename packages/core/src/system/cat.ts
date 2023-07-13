import fs from 'fs'
import { parsePath } from '../utils'
import logger from '../logger'

export function cat(p: string) {
  const filepath = parsePath(p)
  if (!fs.existsSync(filepath)) {
    // TODO
  }
  if (!fs.statSync(filepath).isFile()) {
    // TODO
  }
  logger.info(`cat ${p}`)
  console.log(fs.readFileSync(filepath, 'utf-8'))
}
