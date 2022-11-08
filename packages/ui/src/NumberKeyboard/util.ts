import { isString, isStringArray } from '../helpers/util'
import { getEnumsValue } from '../helpers/validator'
import type { KeyboardType } from './types'

const KEYBOARD_TYPES: KeyboardType[] = ['default', 'rightColumn']

export const getBodyClasses = (
  { type, title }: { type?: KeyboardType; title?: string },
  showHeaderConfirm: boolean
) => [
  'ta-number-keyboard_body',
  `type--${getEnumsValue(KEYBOARD_TYPES, type)}`,
  { 'has--header': showHeaderConfirm || title }
]

export const isShowHeaderConfirm = ({
  type,
  customKey
}: {
  type?: KeyboardType
  customKey?: string | string[]
}) =>
  type !== 'rightColumn' &&
  (isString(customKey) || (isStringArray(customKey) && customKey.length > 0))
