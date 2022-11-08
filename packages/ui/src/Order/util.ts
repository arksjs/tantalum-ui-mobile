import { getNumber } from '../helpers/util'
import type { Position } from './types'

export const getClasses = (dragOn: boolean) => ['ta-order', { drag: dragOn }]

export const getStyles = (orderHeight: number) => ({
  height: orderHeight + 'px'
})

export const getItemClasses = (
  item: Position,
  index: number,
  dragCurrent: number,
  dragFixed: number
) => [
  'ta-order_item',
  {
    current: dragCurrent === index,
    deleted: item.deleted,
    fixed: dragFixed === index
  }
]

export const getItemStyles = (item: Position, colNum: number) => ({
  left: item.left + 'px',
  top: item.top + 'px',
  width: (1 / colNum) * 100 + '%'
})

export const getItemRatioStyles = (aspectRatio?: number | string) => ({
  paddingTop: getNumber(aspectRatio, 1) * 100 + '%'
})
