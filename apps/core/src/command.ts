import childProcess from 'child_process'
import { Store, getStore } from '@js-sh/store'
import { logger } from '@js-sh/utils'

function command(command: string) {
  const store = getStore()
  const [cmd, ...args] = command.split(/\s+/g)
  logger.info(command)
  const { stdout, stderr, output } = childProcess.spawnSync(cmd, args, {
    cwd: store.cwd,
    encoding: 'utf-8',
    stdio: 'pipe',
  })
  return {
    stdout,
    stderr,
    [Symbol.toStringTag]() {
      return output
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
