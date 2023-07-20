import fs from 'fs'
import path from 'path'
import { parsePath } from '../utils'
import logger from '../logger'

function rmDir(p: string) {
  const filelist = fs.readdirSync(p)
  filelist.forEach((filename) => {
    const curPath = path.resolve(p, filename)
    const stat = fs.statSync(curPath)
    if (stat.isDirectory()) {
      rmDir(curPath)
    } else if (stat.isFile()) {
      fs.rmSync(curPath)
    }
  })
  fs.rmdirSync(p)
}

export function rm(p: string) {
  const filePath = parsePath(p)
  if (!fs.existsSync(filePath)) {
    return
  }
  const stat = fs.statSync(filePath)
  if (stat.isDirectory()) {
    rmDir(filePath)
  } else if (stat.isFile()) {
    fs.rmSync(filePath)
  }
  logger.info(`rm -rf ${p}`)
  fs.rmdirSync(p)
}
