import fs from 'fs'
import path from 'path'
import { rimrafSync } from 'rimraf'
import { getMoveStore } from './store'

export const moveFile = (sourcePath: string, targetPath: string) => {
  if (sourcePath === targetPath) return false
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  if (fs.existsSync(targetPath) && !getMoveStore().moveOptions.force) {
    return false
  }
  try {
    moveMap.rename(sourcePath, targetPath)
  } catch (error) {
    if (error instanceof Error && error.message.includes('EXDEV')) {
      moveMap.copy(sourcePath, targetPath)
    } else {
      throw error
    }
  }
  return true
}

export const moveMap = {
  rename: (sourcePath: string, targetPath: string) => {
    fs.renameSync(sourcePath, targetPath)
  },
  copy: (sourcePath: string, targetPath: string) => {
    const stat = fs.statSync(sourcePath)
    fs.copyFileSync(sourcePath, targetPath)
    fs.chownSync(targetPath, stat.uid, stat.gid)
    fs.chmodSync(targetPath, stat.mode)
    fs.utimesSync(targetPath, stat.atimeMs, stat.mtimeMs)
    rimrafSync(sourcePath)
  },
}
