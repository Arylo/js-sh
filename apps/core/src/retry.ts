
interface IRetryOptions<F extends Function> {
  time: number,
  index?: number,
  callback: F,
}

async function retryHandler<F extends Function>(options: IRetryOptions<F>) {
  const {
    time,
    index = 1,
    callback,
  } = options
  try {
    return await callback()
  } catch (e) {
    if (time > index) {
      return retryHandler({ ...options, index: index + 1 })
    }
    throw e
  }
}

export const retry = <F extends Function>(time: number, callback: F) => retryHandler({ time, callback })
