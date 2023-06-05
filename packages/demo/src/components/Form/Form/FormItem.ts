import { TaFormItem } from '@/index'
import { connect, mapProps } from '@formily/vue'
import { isVoidField } from '@formily/core'

export default connect(
  TaFormItem,
  mapProps({ validateStatus: true, title: 'label', required: true }, (props: any, field) => {
    if (isVoidField(field)) return props
    if (!field) return props

    const getMessage = () => {
      if (field.validating) return
      if (props.error) return props.error
      if (field.selfErrors.length) return field.selfErrors
      // if (field.selfWarnings.length) return split(field.selfWarnings)
      // if (field.selfSuccesses.length) return split(field.selfSuccesses)
    }

    return {
      error: getMessage()
    }
  }) as any
)
