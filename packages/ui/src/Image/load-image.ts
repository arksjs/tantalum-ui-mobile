import Exception from '../helpers/exception'
import type { TypeException } from '../helpers/types'
import type { LoadedResource } from './types'

type LoadObject = {
  uid: number | symbol
  src: string
  checkInView: () => boolean
  onLoad: (res: LoadedResource) => void
  onError: (e: TypeException) => void
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
  reject: (e: TypeException) => void
) {
  const image = new Image()
  if (!item || !item.src) {
    const err = new Exception(
      'src is required',
      Exception.TYPE.DEFAULT,
      'Image'
    )
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
    reject(
      new Exception(
        `src "${item.src}" not found`,
        Exception.TYPE.DEFAULT,
        'Image'
      )
    )
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
    // 没有监听对队列了，在1秒后关闭监听
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
    // 如果不存在，入监听队列
    ListenerQueue.push(vm)
  } else {
    // 覆盖一下
    ListenerQueue[index] = vm
  }

  // 进来的时候优先测试一下
  lazyCheck(vm)

  on()
}

function checkQueue() {
  // 此时的this 指的是window
  ListenerQueue.forEach(vm => {
    lazyCheck(vm)
  })
}

// 性能优化
let isOn = false
let offTimer: number

function on() {
  clearTimeout(offTimer)
  if (!isOn) {
    // 没有开启才可以添加事件
    DEFAULT_EVENTS.forEach(eventName => {
      window.addEventListener(eventName, checkQueue, false)
    })
  }
}

function off() {
  if (ListenerQueue.length === 0) {
    // 确认真没有监听事件才关闭
    DEFAULT_EVENTS.forEach(eventName => {
      window.removeEventListener(eventName, checkQueue, false)
    })
    isOn = false
  }
}
