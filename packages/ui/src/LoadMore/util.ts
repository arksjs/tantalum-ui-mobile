export const getClasses = (props: {
  loading?: boolean
  vertical?: boolean
}) => [
  'ak-load-more',
  'ak-horizontal-hairline',
  {
    loading: !!props.loading,
    vertical: !!props.vertical
  }
]
