import fs from 'fs'
import { parsePath, logger } from '@js-sh/utils'

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
