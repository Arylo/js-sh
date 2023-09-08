import { parseGlobPath, startCommand } from '@js-sh/utils'
import { rimrafSync } from 'rimraf'

export function rm(p: string) {
  const command = startCommand('rm -rf', p)
  const filePaths = parseGlobPath(p)
  filePaths.forEach(filePath => rimrafSync(filePath))
  return command.appendResult(true)
}
