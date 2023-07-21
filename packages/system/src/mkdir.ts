import fs from 'fs'
import { parsePath, logger } from '@js-sh/utils'

export function mkdir(p: string) {
  const folderPath = parsePath(p)

  if (fs.existsSync(folderPath)) {
    if (fs.statSync(folderPath).isDirectory()) {
      return
    }
    // TODO
  }
  logger.info(`mkdir -p ${p}`)
  fs.mkdirSync(folderPath, { recursive: true })
}
