import type { CSSProperties } from '../helpers/types'
import { cloneData } from '../helpers/util'
import type { DistanceOptions, ImageObject } from './types'

export const mergeLoadedData = (
  old: ImageObject,
  {
    width,
    height
  }: {
    width: number
    height: number
    src: string
  }
) => {
  const image = cloneData(old)
  const { clientWidth } = document.documentElement

  if (width > clientWidth) {
    image.width = clientWidth
    image.height = height * (clientWidth / width)
    // image.width = width
    // image.height = height
  } else {
    image.width = width
    image.height = height
  }
  image.naturalWidth = width
  image.naturalHeight = height
  image.initialWidth = image.width
  image.initialHeight = image.height
  image.loaded = true

  return image
}

export function getDistance(p1: DistanceOptions, p2: DistanceOptions) {
  const x = p2.pageX - p1.pageX
  const y = p2.pageY - p1.pageY
  return Math.sqrt(x * x + y * y)
}

export function getImageStyles(item: ImageObject) {
  return {
    width: item.width + 'px',
    height: item.height + 'px',
    marginLeft: item.offsetLeft + 'px',
    marginTop: item.offsetTop + 'px'
  } as CSSProperties
}
