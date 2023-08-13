import { logger, parseGlobPath } from '@js-sh/utils'
import { readFile } from '../readFile'

export function cat(p: string) {
  logger.info(`cat ${p}`)
  const filepaths = parseGlobPath(p)
  if (filepaths.length === 0) {
    return logger.error(`${p} is not exist`)
  }
  filepaths.forEach((filepath) => {
    const content = readFile(filepath)
    console.log(content)
  })
}
