import { logger } from './utils/logger'
import { notification } from './utils/notification'

class CommandOutput {
  private code = 0
  constructor(...commands: any[]) {
    commands && this.setCommands(commands)
  }
  public appendResult<D>(result: D, content?: string | string[], code?: number) {
    if (this.code !== 0) {
      throw new Error(this.parseContent(content).join(''))
    }
    if (typeof code === 'number') {
      this.code = code
    }
    if (typeof content !== 'undefined' && (typeof content === 'string' || (Array.isArray(content) && content.length))) {
      const textArr = this.parseContent(content)
      textArr.forEach(text => notification(text))
    }
    return result
  }
  private setCommands(commands: any[]) {
    const text = commands
      .map((command) => {
        if (typeof command === 'string') {
          return command.replace(/^\s*|\s*$/g, '')
        }
        return command
      })
      .filter((command) => {
        if (typeof command === 'string') {
          if (command.length === 0) return false
        }
        return true
      })
      .join(' ')
    if (text) {
      logger.info(text)
    }
  }
  private parseContent = (content?: string | string[]) => {
    if (content) {
      return Array.isArray(content) ? content : [content]
    }
    return []
  }
}

export const startCommand = (...commands: any[]) => new CommandOutput(...commands)
