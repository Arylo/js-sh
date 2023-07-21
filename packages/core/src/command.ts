import childProcess from 'child_process'
import { Store, getStore } from '@js-sh/store'
import { logger } from '@js-sh/utils'

function command(firstArg: string, ...args: string[]) {
  const store = getStore()
  const cmd = firstArg.split(/\s+/)[0]
  const cmdArgs = [
    firstArg.replace(new RegExp(`^${cmd}`), ''),
    ...args,
  ].map(arg => arg.replace(/(^\s+|\s+$)/g, ''))
  logger.info(cmd, ...cmdArgs)
  const { stdout, stderr } = childProcess.spawnSync(cmd, cmdArgs, {
    cwd: store.cwd,
    encoding: 'utf-8',
    stdio: 'pipe',
  })
  return {
    stdout,
    stderr,
    [Symbol.toStringTag]() {
      return stdout
    },
  }
}

export const $ = new Proxy(command, {
  get(_, key) {
    const target = key in Function.prototype ? _ : getStore()
    return Reflect.get(target, key)
  },
  set(_, key, newValue) {
    const target = key in Function.prototype ? _ : getStore()
    Reflect.set(target, key, newValue)
    return true
  },
}) as typeof command & Store
