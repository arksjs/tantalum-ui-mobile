export type EmptyType = 'default' | 'error' | 'network' | 'search'

export interface EmptyProps {
  description?: string
  type?: EmptyType
}
