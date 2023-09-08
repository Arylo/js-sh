import { logger, parseGlobPath, startCommand } from '@js-sh/utils'
import { readFile } from '../readFile'

export function cat(globPath: string) {
  const command = startCommand('cat', globPath)
  const filepaths = parseGlobPath(globPath)
  if (filepaths.length === 0) {
    return logger.error(`${globPath} is not exist`)
  }
  filepaths.forEach((filepath) => {
    const content = readFile(filepath)
    command.appendResult(undefined, content)
  })
}
