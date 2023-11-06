export interface WatermarkFontType {
  color?: string
  fontSize?: number | string
  fontWeight?: 'normal' | 'light' | 'weight' | number
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  fontFamily?: string
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center'
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
}

export interface WatermarkProps {
  zIndex?: number
  rotate?: number
  width?: number
  height?: number
  image?: string
  content?: string | string[]
  font?: WatermarkFontType
  gap?: [number, number]
  offset?: [number, number]
}
