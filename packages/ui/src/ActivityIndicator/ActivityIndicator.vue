<template>
  <LoadingIcon
    :class="classes"
    :size="nSize"
    :rate="0.2"
    :strokeWidth="0.0537 * nSize"
    :color="color"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { LoadingIcon } from '../LoadingIcon'
import { colorValidator } from '../helpers/validator'
import { getActivityIndicatorClasses } from './util'
import { getNumber } from '../helpers/util'

const DEFAULT_SIZE = 20

export default defineComponent({
  name: 'ak-activity-indicator',
  components: { LoadingIcon },
  props: {
    animated: {
      type: Boolean,
      default: true
    },
    size: {
      type: [Number, String],
      default: DEFAULT_SIZE
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const classes = computed(() => {
      return getActivityIndicatorClasses(props.animated)
    })

    const nSize = computed(() => {
      return getNumber(props.size, DEFAULT_SIZE)
    })

    return {
      classes,
      nSize
    }
  }
})
</script>
