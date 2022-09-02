import { stringMix2StringArray } from '../helpers/util'
import type { Accept } from './types'

export const ACCEPT_TYPES = new Map<Accept, string>([
  ['all', 'image/*'],
  ['png', 'image/png'],
  ['jpeg', 'image/jpeg'],
  ['jpg', 'image/jpeg'],
  ['webp', 'image/webp']
])

export function getAccepts(val?: Accept | Accept[]) {
  let ret: string[] = []

  if (val == null) {
    ret.push(ACCEPT_TYPES.get('all') as string)
  } else {
    const arr = stringMix2StringArray(val) as Accept[]

    for (let i = 0; i < arr.length; i++) {
      const accept = ACCEPT_TYPES.get(arr[i])

      if (arr[i] === 'all' && accept) {
        ret = [accept]
        break
      } else if (accept) {
        ret.push(accept)
      }
    }
  }

  return ret
}

export const getUploadButtonClasses = (disabled?: boolean) => [
  'ak-image-uploader_upload-button',
  { disabled: !!disabled }
]

let uid = 0

const urlIdCache: Record<string, number> = {}

export function urlId(url: string, id?: number) {
  url = url.substring(url.length - 100)

  if (id) {
    urlIdCache[url] = id
    return id
  }

  return urlIdCache[url] || (urlIdCache[url] = ++uid)
}

export function getNewUid() {
  return ++uid
}
