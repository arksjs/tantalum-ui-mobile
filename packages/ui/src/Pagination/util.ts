import { getNumber } from '../helpers/util'

export const getTotal = (total?: number | string) =>
  Math.max(getNumber(total, 1), 1)
