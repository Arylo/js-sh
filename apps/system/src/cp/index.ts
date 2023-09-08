import fs from 'fs'
import path from 'path'
import { logger, startCommand } from '@js-sh/utils'
import { Store, getStore, run as storeRun } from '@js-sh/store'
import { MoveNCopyPathStat } from '../consts'
import { analysisSourceNTargetPath } from '../utils'

interface ICopyOptions {
  force: boolean,
}
const DEFAULT_COPY_OPTIONS: ICopyOptions = { force: false }

const getCopyStore = () => getStore() as Store & { copyOptions: ICopyOptions }

const copyFile = (sourcePath: string, targetPath: string) => {
  if (sourcePath === targetPath) return
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  if (!fs.existsSync(targetPath) || getCopyStore().copyOptions.force) {
    fs.copyFileSync(sourcePath, targetPath)
  } else {
    logger.info(`${sourcePath} is existed, Skip`)
  }
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

const cpBase = (
  sourcePath: string | string[],
  targetPath: string,
  options?: Partial<ICopyOptions>,
) => {
  const opts = Object.assign({}, DEFAULT_COPY_OPTIONS, options)
  storeRun<{ copyOptions: ICopyOptions }>({ copyOptions: opts }, () => {
    const status = analysisSourceNTargetPath(sourcePath, targetPath)
    const sources = Array.isArray(sourcePath) ? sourcePath : [sourcePath]
    startCommand('cp -R', opts.force ? ' -f' : '', ...sources, targetPath)

    status.sources.forEach((source) => {
      run(source, status.target)
    })
  })
}

const modifiers = {
  force(sourcePath: string | string[], targetPath: string) {
    return cpBase(sourcePath, targetPath, { force: true })
  },
}

type CP = typeof cpBase & typeof modifiers

export const cp = new Proxy(cpBase, {
  get(target, p) {
    if (Object.keys(modifiers).includes(p as string)) return Reflect.get(modifiers, p)
    return Reflect.get(target, p)
  },
}) as CP
