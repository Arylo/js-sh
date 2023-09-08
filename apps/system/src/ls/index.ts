import fs from 'fs'
import path from 'path'
import { getStore } from '@js-sh/store'
import { parseGlobPath, startCommand } from '@js-sh/utils'

const readDir = (p: string) => fs.readdirSync(p)
  .map(filename => path.resolve(p, filename))
  .map(filepath => (fs.statSync(filepath).isDirectory() ? `${filepath}${path.sep}` : filepath))

export const ls = (...paths: string[]) => {
  const store = getStore()
  const command = startCommand('ls', ...paths)
  const list = (paths.length ? paths : ['']).reduce<string[]>((list, p) => {
    const curPath = path.resolve(store.cwd, p)
    if (path.isAbsolute(curPath) && fs.existsSync(curPath)) {
      const stat = fs.statSync(curPath)
      if (stat.isFile()) {
        list.push(curPath)
      } else {
        list.push(...readDir(curPath))
      }
    } else {
      parseGlobPath(p).forEach((curPath) => {
        const stat = fs.statSync(curPath)
        if (stat.isFile()) {
          list.push(curPath)
        } else {
          list.push(...readDir(curPath))
        }
      })
    }
    return list
  }, []).sort()
  return command.appendResult(
    list,
    list.map(item => (item.startsWith(store.cwd) ? item.replace(`${store.cwd}${path.sep}`, '') : item)),
  )
}
