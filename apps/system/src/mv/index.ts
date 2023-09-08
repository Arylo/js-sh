import fs from 'fs'
import path from 'path'
import { startCommand } from '@js-sh/utils'
import { run as storeRun } from '@js-sh/store'
import { MoveNCopyPathStat } from '../consts'
import { analysisSourceNTargetPath } from '../utils'
import { IMoveOptions } from './type.d'
import { moveFile } from './utils/moveFile'

const DEFAULT_MOVE_OPTIONS: IMoveOptions = { force: false }

const moveFolder = (sourcePath: string, targetPath: string) => {
  if (sourcePath === targetPath) return false
  let isRemoveFolder = true
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.readdirSync(sourcePath)
    .forEach((name) => {
      const p = path.resolve(sourcePath, name)
      const stat = fs.statSync(p)
      if (stat.isFile()) {
        const result = moveFile(p, path.resolve(targetPath, name))
        isRemoveFolder = isRemoveFolder && !!result
      } else if (stat.isDirectory()) {
        const result = moveFolder(p, path.resolve(targetPath, name))
        isRemoveFolder = isRemoveFolder && !!result
      }
    })
  isRemoveFolder && fs.rmdirSync(sourcePath)
  return isRemoveFolder
}

const mvAction = (
  source: ReturnType<typeof analysisSourceNTargetPath>['target'],
  target: ReturnType<typeof analysisSourceNTargetPath>['target'],
) => {
  const map = {
    [[
      MoveNCopyPathStat.FILE,
      MoveNCopyPathStat.FILE,
    ].join()]: () => {
      moveFile(source.path, target.path)
    },
    [[
      MoveNCopyPathStat.FILE,
      MoveNCopyPathStat.UNDER_FOLDER,
    ].join()]: () => {
      moveFile(source.path, path.resolve(target.path, path.basename(source.path)))
    },
    [[
      MoveNCopyPathStat.FOLDER,
      MoveNCopyPathStat.FOLDER,
    ].join()]: () => {
      moveFolder(source.path, target.path)
    },
    [[
      MoveNCopyPathStat.FOLDER,
      MoveNCopyPathStat.UNDER_FOLDER,
    ].join()]: () => {
      moveFolder(source.path, path.resolve(target.path, path.basename(source.path)))
    },
  }
  map[[source.stat, target.stat].join()]?.()
}

const mvBase = (
  sourcePath: string | string[],
  targetPath: string,
  options?: Partial<IMoveOptions>,
) => {
  const opts = Object.assign({}, DEFAULT_MOVE_OPTIONS, options)
  storeRun<{ moveOptions: IMoveOptions }>({ moveOptions: opts }, () => {
    const status = analysisSourceNTargetPath(sourcePath, targetPath)
    const sources = Array.isArray(sourcePath) ? sourcePath : [sourcePath]
    startCommand('mv', opts.force ? ' -f' : '', ...sources, targetPath)

    status.sources.forEach((source) => {
      mvAction(source, status.target)
    })
  })
}

const modifiers = {
  force(sourcePath: string | string[], targetPath: string) {
    return mvBase(sourcePath, targetPath, { force: true })
  },
}

type MV = typeof mvBase & typeof modifiers

export const mv = new Proxy(mvBase, {
  get(target, p) {
    if (Object.keys(modifiers).includes(p as string)) return Reflect.get(modifiers, p)
    return Reflect.get(target, p)
  },
}) as MV
