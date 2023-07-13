import childProcess from 'child_process'
import { Store, getStore } from '../store'
import logger from '../logger'

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
  get(_, key, receiver) {
    const target = key in Function.prototype ? _ : getStore()
    return Reflect.get(target, key, receiver)
  },
  set(_, key, newValue, receiver) {
    const target = key in Function.prototype ? _ : getStore()
    return Reflect.set(target, key, newValue, receiver)
  },
}) as typeof command & Store
