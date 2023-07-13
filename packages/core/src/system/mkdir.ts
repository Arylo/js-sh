import fs from 'fs'
import { parsePath } from '../utils'
import logger from '../logger'

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
