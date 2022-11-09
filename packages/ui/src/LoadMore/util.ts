export const getClasses = (props: {
  loading?: boolean
  vertical?: boolean
}) => [
  'ta-load-more',
  'ta-horizontal-hairline',
  {
    loading: !!props.loading,
    vertical: !!props.vertical
  }
]
