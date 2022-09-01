interface TimerCallback {
  (): void
}

interface TimerCache {
  [propName: number]: {
    timer: number
    interval: number
    callbacks: TimerCallback[]
  }
}

const cache: TimerCache = {}

function step(interval: number) {
  if (cache[interval]) {
    cache[interval].callbacks.forEach(callback => {
      callback()
    })
  }
}

export function addTimer(callback: TimerCallback, interval = 60) {
  if (cache[interval]) {
    cache[interval].callbacks.push(callback)
  } else {
    cache[interval] = {
      timer: window.setInterval(() => step(interval), interval * 1000),
      interval,
      callbacks: [callback]
    }
  }

  return function removeTimer() {
    if (cache[interval]) {
      const { timer, callbacks } = cache[interval]

      for (let i = 0; i < callbacks.length; i++) {
        if (callbacks[i] === callback) {
          callbacks.splice(i, 1)
        }
      }

      if (callbacks.length === 0) {
        clearInterval(timer)
        delete cache[interval]
      }
    }
  }
}
