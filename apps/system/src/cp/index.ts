import fs from 'fs'
import path from 'path'
import { logger } from '@js-sh/utils'
import { MoveNCopyPathStat } from '../consts'
import { analysisSourceNTargetPath } from '../utils'

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

const run = (
  source: ReturnType<typeof analysisSourceNTargetPath>['target'],
  target: ReturnType<typeof analysisSourceNTargetPath>['target'],
) => {
  const map = {
    [[
      MoveNCopyPathStat.FILE,
      MoveNCopyPathStat.FILE,
    ].join()]: () => {
      copyFile(source.path, target.path)
    },
    [[
      MoveNCopyPathStat.FILE,
      MoveNCopyPathStat.UNDER_FOLDER,
    ].join()]: () => {
      copyFile(source.path, path.resolve(target.path, path.basename(source.path)))
    },
    [[
      MoveNCopyPathStat.FOLDER,
      MoveNCopyPathStat.FOLDER,
    ].join()]: () => {
      copyFolder(source.path, target.path)
    },
    [[
      MoveNCopyPathStat.FOLDER,
      MoveNCopyPathStat.UNDER_FOLDER,
    ].join()]: () => {
      copyFolder(source.path, path.resolve(target.path, path.basename(source.path)))
    },
  }
  map[[source.stat, target.stat].join()]?.()
}

export const cp = (sourcePath: string | string[], targetPath: string) => {
  const status = analysisSourceNTargetPath(sourcePath, targetPath)
  const sources = Array.isArray(sourcePath) ? sourcePath : [sourcePath]
  logger.info(`cp -Rf ${sources.join(' ')} ${targetPath}`)

  status.sources.forEach((source) => {
    run(source, status.target)
  })
}
