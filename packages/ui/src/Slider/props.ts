import { isNumeric } from '../helpers/util'
import { colorValidator } from '../helpers/validator'

export const slideProps = {
  min: {
    type: [Number, String],
    validator: isNumeric,
    default: 0
  },
  max: {
    type: [Number, String],
    validator: isNumeric,
    default: 100
  },
  step: {
    type: [Number, String],
    validator: isNumeric,
    default: 1
  },
  showValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    validator: colorValidator
  }
}
