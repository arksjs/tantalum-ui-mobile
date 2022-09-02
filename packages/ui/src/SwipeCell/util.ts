import { STATE_TYPES } from '../helpers/constants'
import { getEnumsValue } from '../helpers/validator'
import type { ButtonOption } from './types'

export const getButtons = (buttons?: ButtonOption[]) => {
  const _buttons: Required<ButtonOption>[] = []

  if (Array.isArray(buttons)) {
    buttons.forEach(v => {
      if (v && typeof v.text === 'string') {
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
