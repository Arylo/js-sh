import { logger, parseGlobPath } from '@js-sh/utils'
import { rimrafSync } from 'rimraf'

export function rm(p: string) {
  logger.info(`rm -rf ${p}`)
  const filePaths = parseGlobPath(p)
  filePaths.forEach(filePath => rimrafSync(filePath))
}
