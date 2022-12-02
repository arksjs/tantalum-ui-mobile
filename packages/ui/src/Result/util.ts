import { getEnumsValue } from '../helpers'
import type { ResultType } from './types'

export const RESULT_TYPES: ResultType[] = ['info', 'warning', 'success', 'fail']

export const getType = (type?: ResultType) => getEnumsValue(RESULT_TYPES, type)

export const getTypeClass = (type?: ResultType) => ['type--' + getType(type)]
