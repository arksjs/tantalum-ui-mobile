export type OnChange = (value: number) => void

export interface PaginationProps {
  value?: number | string
  total: number | string
}

export interface PaginationEmits {
  onChange?: OnChange
}
