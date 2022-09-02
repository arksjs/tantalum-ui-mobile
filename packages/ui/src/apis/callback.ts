import type {
  ApiOptionsComplete,
  ApiOptionsFail,
  ApiOptionsSuccess
} from './types'
import Exception from '../helpers/exception'
import { noop } from '../helpers/util'
import type { AnyObject } from '../helpers/types'

/**
 * 获取回调函数
 * @param options object
 */
export function getCallbackFns(options: AnyObject): {
  success: ApiOptionsSuccess
  fail: ApiOptionsFail
  complete: ApiOptionsComplete
} {
  return {
    success:
      typeof options.success === 'function'
        ? options.success
        : noop.bind(options),
    fail(error: Error | string) {
      if (typeof options.fail === 'function') {
        ;(options.fail as ApiOptionsFail)(new Exception(error))
      } else {
        console.error(error)
      }
    },
    complete:
      typeof options.complete === 'function'
        ? options.complete
        : noop.bind(options)
  }
}
