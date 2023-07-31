import fs from 'fs'
import { logger, parseGlobPath } from '@js-sh/utils'

export function cat(p: string) {
  logger.info(`cat ${p}`)
  const filepaths = parseGlobPath(p)
  if (filepaths.length === 0) {
    return logger.error(`${p} is not exist`)
  }
  filepaths.forEach((filepath) => {
    if (!fs.statSync(filepath).isFile()) {
      return logger.error(`${filepath} is not a file`)
    }
    console.log(fs.readFileSync(filepath, 'utf-8'))
  })
}
