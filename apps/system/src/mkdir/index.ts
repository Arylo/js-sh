import fs from 'fs'
import { parsePath, startCommand } from '@js-sh/utils'

export function mkdir(p: string) {
  const folderPath = parsePath(p)
  const command = startCommand('mkdir -p', p)

  if (fs.existsSync(folderPath)) {
    if (fs.statSync(folderPath).isDirectory()) {
      return command.appendResult(true)
    }
    return command.appendResult(false)
  }
  fs.mkdirSync(folderPath, { recursive: true })
  return command.appendResult(true)
}
