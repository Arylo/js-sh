import fs from 'fs'
import path from 'path'
import { getMoveStore } from './store'

export const moveFile = (sourcePath: string, targetPath: string) => {
  if (sourcePath === targetPath) return false
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  if (fs.existsSync(targetPath) && !getMoveStore().moveOptions.force) {
    return false
  }
  moveMap.rename(sourcePath, targetPath)
  return true
}

export const moveMap = {
  rename: (sourcePath: string, targetPath: string) => {
    try {
      return fs.renameSync(sourcePath, targetPath)
    } catch (error) {
      if (error instanceof Error && error.message.includes('EXDEV')) {
        return moveMap.copy(sourcePath, targetPath)
      }
      throw error
    }
  },
  copy: (sourcePath: string, targetPath: string) => {
    fs.copyFileSync(sourcePath, targetPath)
    fs.unlinkSync(sourcePath)
  },
}
