import fs from 'fs'
import { parseGlobPath, parsePath } from '@js-sh/utils'
import { MoveNCopyPathStat } from './consts'

const genStatus = (targetPath: string) => ({
  sources: [] as {
    stat: MoveNCopyPathStat,
    path: string,
  }[],
  target: {
    stat: MoveNCopyPathStat.UNKNOWN,
    path: targetPath,
  },
})

export const analysisSourceNTargetPath = (source: string | string[], target: string) => {
  const sources = Array.isArray(source) ? source : [source]
  const targetPath = parsePath(target)
  const status = genStatus(targetPath)

  if (typeof source === 'string') {
    const sourcePath = parsePath(sources[0])
    if (fs.existsSync(sourcePath)) {
      const stat = fs.statSync(sourcePath)
      // file => file/folder
      if (stat.isFile()) {
        status.sources.push({
          stat: MoveNCopyPathStat.FILE,
          path: sourcePath,
        })
        if (/[\\/]$/.test(target)) {
          status.target.stat = MoveNCopyPathStat.UNDER_FOLDER
        } else {
          status.target.stat = MoveNCopyPathStat.FILE
        }
      }
      // folder => folder
      if (stat.isDirectory()) {
        status.sources.push({
          stat: MoveNCopyPathStat.FOLDER,
          path: sourcePath,
        })
        if (/[\\/]$/.test(target)) {
          status.target.stat = MoveNCopyPathStat.UNDER_FOLDER
        } else {
          status.target.stat = MoveNCopyPathStat.FOLDER
        }
      }
      return status
    }
  }
  // glob files => folder
  const sourcePaths = sources.reduce<string[]>((list, source) => {
    list.push(...parseGlobPath(source))
    return list
  }, [])
  status.target.stat = MoveNCopyPathStat.UNDER_FOLDER
  Array.from(new Set(sourcePaths))
    .forEach((sourcePath) => {
      const stat = fs.statSync(sourcePath)
      if (stat.isFile()) {
        status.sources.push({
          stat: MoveNCopyPathStat.FILE,
          path: sourcePath,
        })
      } else if (stat.isDirectory()) {
        status.sources.push({
          stat: MoveNCopyPathStat.FOLDER,
          path: sourcePath,
        })
      }
    })
  return status
}
