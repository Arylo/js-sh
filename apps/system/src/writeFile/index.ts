import fs from 'fs'
import path from 'path'
import { parsePath, startCommand } from '@js-sh/utils'

export const writeFile = (p: string, data: any, options?: { encoding: BufferEncoding }) => {
  const realPath = parsePath(p)
  if (fs.existsSync(realPath) && !fs.statSync(realPath).isFile()) {
    startCommand(false, `${p} is exist but it is not a file`, 1)
  } else {
    fs.mkdirSync(path.dirname(realPath), { recursive: true })
    fs.writeFileSync(realPath, data, options ?? 'utf-8')
  }
}
