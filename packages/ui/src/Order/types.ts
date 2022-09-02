import type { UniqueID } from '../helpers/types'

export type Item = {
  id: UniqueID
  draggable?: boolean
}

export type OnDelete = (payload: {
  type: string
  index: number
  item: {
    id: UniqueID
  }
}) => void

export interface OrderProps {
  items: Item[]
  columnNumber?: number | string
  deletable?: boolean
  aspectRatio?: number | string
}

export interface OrderEmits {
  onUpdateItems: (items: Item[]) => void
  onDelete?: OnDelete
}

export interface Position {
  id: UniqueID
  draggable: boolean
  top: number
  left: number
  deleted: boolean
}
