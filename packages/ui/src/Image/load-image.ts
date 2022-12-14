import type { LoadedResource } from './types'

type LoadObject = {
  uid: number | symbol
  src: string
  checkInView: () => boolean
  onLoad: (res: LoadedResource) => void
  onError: (e: Error) => void
  done?: boolean
}

const DEFAULT_EVENTS = [
  'scroll',
  'wheel',
  'mousewheel',
  'resize',
  'animationend',
  'transitionend',
  'touchmove'
]

const LAZY_PRELOAD = 1.3

export function withCheckInView($el: HTMLElement) {
  return function checkInView() {
    const { top, right, bottom, left } = $el.getBoundingClientRect()

    return (
      top < window.innerHeight * LAZY_PRELOAD &&
      bottom > 0 &&
      left < window.innerWidth * LAZY_PRELOAD &&
      right > 0
    )
  }
}

export function loadNow(vm: LoadObject) {
  loadImageAsync(
    vm,
    res => {
      if (!vm.done) {
        vm.done = true
        vm.onLoad(res)
      }
    },
    e => {
      if (!vm.done) {
        vm.done = true
        vm.onError(e)
      }
    }
  )
}

function loadImageAsync(
  item: LoadObject,
  resolve: (res: LoadedResource) => void,
  reject: (e: Error) => void
) {
  const image = new Image()
  if (!item || !item.src) {
    const err = new Error('The "src" is required.')
    return reject(err)
  }

  image.src = item.src

  image.onload = function (e) {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: item.src,
      event: e
    } as LoadedResource)
  }

  image.onerror = function () {
    reject(new Error(`Get src "${item.src}" error.`))
  }
}

const ListenerQueue: LoadObject[] = []

function lazyCheck(vm: LoadObject) {
  if (vm.checkInView()) {
    loadImageAsync(
      vm,
      res => {
        if (!vm.done) {
          removeComponentFromLazy(vm.uid)
          vm.onLoad(res)
        }
      },
      e => {
        if (!vm.done) {
          removeComponentFromLazy(vm.uid)
          vm.onError(e)
        }
      }
    )
  }
}

export function removeComponentFromLazy(uid: number | symbol) {
  const index = lazyQueueIndexOf(uid)

  if (index > -1) {
    const [vm] = ListenerQueue.splice(index, 1)
    vm.done = true
  }

  if (ListenerQueue.length === 0) {
    // ??????????????????????????????1??????????????????
    clearTimeout(offTimer)
    offTimer = window.setTimeout(off, 1000)
  }
}

function lazyQueueIndexOf(uid: number | symbol) {
  for (let i = 0; i < ListenerQueue.length; i++) {
    if (ListenerQueue[i].uid === uid) {
      return i
    }
  }
  return -1
}

export function addLazyQueue(vm: LoadObject) {
  const index = lazyQueueIndexOf(vm.uid)

  if (index === -1) {
    // ?????????????????????????????????
    ListenerQueue.push(vm)
  } else {
    // ????????????
    ListenerQueue[index] = vm
  }

  // ?????????????????????????????????
  lazyCheck(vm)

  on()
}

function checkQueue() {
  // ?????????this ?????????window
  ListenerQueue.forEach(vm => {
    lazyCheck(vm)
  })
}

// ????????????
let isOn = false
let offTimer: number

function on() {
  clearTimeout(offTimer)
  if (!isOn) {
    // ?????????????????????????????????
    DEFAULT_EVENTS.forEach(eventName => {
      window.addEventListener(eventName, checkQueue, false)
    })
  }
}

function off() {
  if (ListenerQueue.length === 0) {
    // ????????????????????????????????????
    DEFAULT_EVENTS.forEach(eventName => {
      window.removeEventListener(eventName, checkQueue, false)
    })
    isOn = false
  }
}
