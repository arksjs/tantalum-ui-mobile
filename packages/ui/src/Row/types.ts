export type JustifyType =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'

export type AlignType = 'top' | 'middle' | 'bottom'

export type UserGutter = number | string | number[]

export interface RowProps {
  gutter?: UserGutter
  justify?: JustifyType
  align?: AlignType
}

export type { JustifyType as RowJustify, AlignType as RowAlign }
