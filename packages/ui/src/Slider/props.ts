import { colorValidator } from '../helpers'

export const slideProps = {
  min: {
    type: [Number, String],
    default: 0
  },
  max: {
    type: [Number, String],
    default: 100
  },
  step: {
    type: [Number, String],
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
