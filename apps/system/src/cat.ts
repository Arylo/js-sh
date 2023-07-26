import fs from 'fs'
import { parsePath, logger } from '@js-sh/utils'

export function cat(p: string) {
  const filepath = parsePath(p)
  if (!fs.existsSync(filepath)) {
    return logger.error(`${p} is not exist`)
  }
  if (!fs.statSync(filepath).isFile()) {
    return logger.error(`${p} is not a file`)
  }
  logger.info(`cat ${p}`)
  console.log(fs.readFileSync(filepath, 'utf-8'))
}
