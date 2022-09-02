export type OnChange = (current: number) => void

export interface PaginationProps {
  current?: number | string
  total: number | string
}

export interface PaginationEmits {
  onUpdateCurrent?: OnChange
  onChange?: OnChange
}
