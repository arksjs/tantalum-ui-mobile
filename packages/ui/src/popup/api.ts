import { createApp } from 'vue'
import type { Component } from 'vue'
import { isObject, objectForEach } from '../helpers/util'
import { getCallbackFns } from '../apis/callback'
import type { AnyObject, EmptyObject } from '../helpers/types'
import type { PopupCustomCancel, PopupBridge, PopupHook } from './types'
import type { ApiOptionsComplete, ApiOptionsFail } from '../apis/types'
import Exception from '../helpers/exception'

type PopupDone = (res: any) => void

type RefFnName = 'customCancel'

interface RefFns {
  customCancel?: PopupCustomCancel
}

const $refs: {
  [propName: string]: {
    uid: number
    fns: RefFns
  }
} = {}

export function createShowPopup<T, E = EmptyObject>({
  apiName,
  createHook,
  component,
  singleMode,
  hookOptions
}: {
  apiName: string
  createHook: (done: PopupDone) => PopupHook
  component: Component
  singleMode?: boolean
  hookOptions?: (options: AnyObject) => AnyObject
}) {
  return function show(
    object: T &
      Partial<{
        success: (res: E) => void
        fail: ApiOptionsFail
        complete: ApiOptionsComplete
      }>
  ) {
    let options: AnyObject

    if (typeof object === 'string') {
      options = {
        title: object
      }
    } else if (!isObject(object)) {
      options = {}
    } else {
      options = object as AnyObject
    }

    if (hookOptions) {
      options = hookOptions(options)
    }

    const { success, fail, complete } = getCallbackFns(options)

    return new Promise<E>(function (resolve, reject) {
      try {
        const key = apiName.replace('show', '')

        const hook = createHook(function (res) {
          success(res)
          complete()
          resolve(res)
        })

        singleMode && clear(key)

        const fns: RefFns = {}
        const propsData: AnyObject = {}

        objectForEach(options, (v, k) => {
          if (!['success', 'fail', 'complete'].includes(k)) {
            if (k === 'mode') {
              propsData.initialMode = v
            } else if (k === 'value') {
              propsData.modelValue = v
            } else {
              propsData[k] = v
            }
          }
        })

        const app = createApp(
          component,
          Object.assign(propsData, {
            visible: true
          })
        )
        app.provide('taApis', {
          in(hookEvent, res) {
            if (hookEvent === 'visibleStateChange' && res.state === 'hidden') {
              app.unmount()
              singleMode && remove(key, $ref.uid)
            }

            hook && hook(hookEvent, res)
          },
          out(key: RefFnName, value: PopupCustomCancel) {
            fns[key] = value
          }
        } as PopupBridge)

        if (typeof document !== 'undefined') {
          app.mount(document.createElement('div'))
        }

        const $ref = {
          uid: app._uid,
          fns
        }

        // 单例：如Toast
        singleMode && ($refs[key] = $ref)

        return app
      } catch (e) {
        fail(new Exception(e))
        complete()
        reject(new Exception(e))
      }
    })
  }
}

function clear(key: string) {
  if ($refs[key]) {
    const fns = $refs[key].fns
    fns.customCancel && fns.customCancel('clear', true)

    delete $refs[key]
  }
}

function remove(key: string, uid: number) {
  if ($refs[key] && $refs[key].uid === uid) {
    delete $refs[key]
  }
}

type HideOptions = Partial<{
  success: (res: EmptyObject) => void
  fail: ApiOptionsFail
  complete: ApiOptionsComplete
}>

export function createHidePopup({ apiName }: { apiName: string }) {
  return function hide(object?: HideOptions) {
    const { success, fail, complete } = getCallbackFns(
      isObject(object) ? (object as HideOptions) : {}
    )

    return new Promise<EmptyObject>((resolve, reject) => {
      try {
        clear(apiName.replace('hide', ''))

        success({})
        complete()
        resolve({})
      } catch (e) {
        fail(new Exception(e))
        complete()
        reject(new Exception(e))
      }
    })
  }
}

export function createConfirmHook(done: PopupDone) {
  const hook: PopupHook = (hookEvent, args) => {
    if (hookEvent === 'cancel') {
      done({
        cancel: true,
        ...args
      })
    } else if (hookEvent === 'confirm') {
      done({
        confirm: true,
        detail: args
      })
    }
  }

  return hook
}

export function createAlertHook(done: PopupDone) {
  const hook: PopupHook = (hookEvent, args) => {
    if (hookEvent === 'visibleStateChange' && args.state === 'shown') {
      done({})
    }
  }

  return hook
}
