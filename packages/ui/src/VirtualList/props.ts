import type { PropType } from 'vue'
import { isInNumberRange, isInteger, type UniqueID } from '../helpers'
import type { OnVisibleItemsChangePayload } from './types'

export const virtualListProps = {
  ids: {
    type: Array as PropType<UniqueID[]>,
    required: true,
    default: () => [] as UniqueID[]
  },
  itemSize: {
    type: [Number, Function] as PropType<number | ((index: number) => number)>
  },
  // 横向
  initialHorizontal: {
    type: Boolean,
    default: false
  },
  // 预加载多少屏
  preLoad: {
    type: Number,
    default: 1.5
  },
  // 开启瀑布流并设置列数
  initialWaterfallCount: {
    type: Number,
    validator: (val: number) => {
      return isInteger(val) && isInNumberRange(val, 1, 5)
    },
    default: 1
  },
  // 认可展示项比例
  approvedItemVisibleScale: {
    type: Number,
    default: 0.5
  }
}

export const emitVisibleItemsChangeValidator = (
  payload: OnVisibleItemsChangePayload
) => payload && Array.isArray(payload.items)
