import fs from 'fs'
import { logger, parsePath } from '@js-sh/utils'

export const readFile = (p: string, options?: { encoding: BufferEncoding }) => {
  const realPath = parsePath(p)
  if (fs.existsSync(realPath)) {
    if (fs.statSync(realPath).isFile()) {
      return fs.readFileSync(realPath, options ?? 'utf-8')
    }
    logger.error(`${p} is not a file`)
  } else {
    logger.error(`${p} is not exist`)
  }
}
