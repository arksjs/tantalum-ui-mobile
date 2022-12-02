import { STATE_TYPES, getEnumsValue, isString } from '../helpers'
import type { ButtonOption } from './types'

export const getButtons = (buttons?: ButtonOption[]) => {
  const _buttons: Required<ButtonOption>[] = []

  if (Array.isArray(buttons)) {
    buttons.forEach(v => {
      if (v && isString(v.text)) {
        _buttons.push({
          text: v.text,
          type: getEnumsValue(STATE_TYPES, v.type)
        })
      }
    })
  }

  return _buttons
}

export const getInnerStyles = ({
  translateX,
  duration
}: {
  translateX: number
  duration: number
}) => ({
  transform: 'translate3d(-' + translateX + 'px, 0px, 0px)',
  transitionDuration: duration + 's'
})

export const getButtonStyles = ({
  buttonTranslateXs,
  duration,
  index
}: {
  buttonTranslateXs: number[]
  duration: number
  index: number
}) => ({
  transform:
    'translate3d(-' + (buttonTranslateXs[index] || 0) + 'px, 0px, 0px)',
  transitionDuration: duration + 's'
})
