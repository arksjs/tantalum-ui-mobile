import { getNumber } from '../helpers'

export const getTotal = (total?: number | string) =>
  Math.max(getNumber(total, 1), 1)
