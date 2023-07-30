import fs from 'fs'
import path from 'path'
import { logger, parseGlobPath, parsePath } from '@js-sh/utils'

const copyFile = (sourcePath: string, targetPath: string) => {
  if (sourcePath === targetPath) return
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.copyFileSync(sourcePath, targetPath)
}

const copyFolder = (sourcePath: string, targetPath: string) => {
  if (sourcePath === targetPath) return
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.readdirSync(sourcePath)
    .forEach((name) => {
      const p = path.resolve(sourcePath, name)
      const stat = fs.statSync(p)
      if (stat.isFile()) {
        copyFile(p, path.resolve(targetPath, name))
      } else if (stat.isDirectory()) {
        copyFolder(p, path.resolve(targetPath, name))
      }
    })
}

export const cp = (source: string | string[], target: string) => {
  const sources = Array.isArray(source) ? source : [source]
  logger.info(`cp ${sources.join(' ')} ${target}`)

  const targetPath = parsePath(target)
  if (sources.length === 1) {
    const sourcePath = parsePath(sources[0])
    if (fs.existsSync(sourcePath)) {
      const stat = fs.statSync(sourcePath)
      // file => file/folder
      if (stat.isFile()) {
        let targetFilePath = targetPath
        if (/[\/\\]$/.test(target)) {
          targetFilePath = path.resolve(targetPath, path.basename(sourcePath))
        }
        if (fs.existsSync(targetFilePath)) {
          // TODO
          return
        }
        copyFile(sourcePath, targetFilePath)
        return
      }
      // folder => folder
      if (stat.isDirectory()) {
        let targetFolderPath = targetPath
        if (/[\/\\]$/.test(target)) {
          targetFolderPath = path.resolve(targetPath, path.basename(sourcePath))
        }
        copyFolder(sourcePath, targetFolderPath)
      }
    }
  }
  // glob files => folder
  const sourcePaths = sources.reduce<string[]>((list, source) => {
    list.push(...parseGlobPath(source))
    return list
  }, [])
  Array.from(new Set(sourcePaths))
    .forEach((sourcePath) => {
      const stat = fs.statSync(sourcePath)
      if (stat.isFile()) {
        copyFile(sourcePath, path.resolve(targetPath, path.basename(sourcePath)))
      } else if (stat.isDirectory()) {
        copyFolder(sourcePath, path.resolve(targetPath, path.basename(sourcePath))
      }
    })
}
