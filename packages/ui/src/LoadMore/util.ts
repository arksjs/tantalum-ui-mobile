export const getClasses = (props: {
  loading?: boolean
  vertical?: boolean
}) => [
  'fx-load-more',
  'fx-horizontal-hairline',
  {
    loading: !!props.loading,
    vertical: !!props.vertical
  }
]
