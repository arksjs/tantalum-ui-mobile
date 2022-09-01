import type { PropType } from 'vue'
import { MODE_NAMES } from './date'
import type { Mode, OptionFilter } from './types'
import type {
  SelectorModelValue,
  SelectorValueParser,
  SelectorValueFormatter
} from '../SelectorField/types'

export const commonProps = {
  modelValue: {
    type: [Date, String, Number, Array] as PropType<SelectorModelValue>
  },
  // 格式化模板
  formatTemplate: {
    type: String
  },
  // 初始模式
  initialMode: {
    type: String as PropType<Mode>,
    default: MODE_NAMES[0]
  },
  // 最小日期
  minDate: {
    type: Date
  },
  // 最大日期
  maxDate: {
    type: Date
  },
  // 过滤器
  filter: {
    type: Function as PropType<OptionFilter>,
    default: () => true
  },
  formatter: {
    type: Function as PropType<SelectorValueFormatter>
  },
  parser: {
    type: Function as PropType<SelectorValueParser>
  }
}
