import fs from 'fs'
import { parsePath, startCommand } from '@js-sh/utils'

export const readFile = (p: string, options?: { encoding: BufferEncoding }) => {
  const realPath = parsePath(p)
  if (fs.existsSync(realPath)) {
    if (fs.statSync(realPath).isFile()) {
      return startCommand()
        .appendResult(fs.readFileSync(realPath, options ?? 'utf-8'))
    }
    startCommand().appendResult(undefined, `${p} is not a file`, 1)
  } else {
    startCommand().appendResult(undefined, `${p} is not exist`, 1)
  }
}
