import { getStore } from './store'

const getPrefix = () => {
  const { cwd, zoneId: index } = getStore()
  const { HOME } = process.env
  const str = [
    index === 0 ? '' : `[${index}] `,
    HOME && cwd.slice(0, HOME.length) === HOME ? `~${cwd.slice(HOME.length)}` : cwd,
    '>',
  ]
  return str.join('')
}

export default {
  info(...args: any[]) {
    const { verbose } = getStore()
    verbose && console.log(getPrefix(), ...args)
  },
  error(...args: any[]) {
    const { verbose } = getStore()
    verbose && console.error(getPrefix(), ...args)
  },
}
