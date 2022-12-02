<template>
  <component
    :is="component"
    class="ta-icon"
    :class="{ spin }"
    :style="styles"
    :iconName="iconName"
  >
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import SpriteSVG from './SpriteSVG.vue'
import { colorValidator, iconValidator, isSvgComponent } from '../helpers'
import type { IconData } from './types'
import { getIconStyles } from './util'

export default defineComponent({
  name: 'ta-icon',
  props: {
    icon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 0
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const styles = computed(() => getIconStyles(props))
    const component = computed(() =>
      isSvgComponent(props.icon) ? props.icon : SpriteSVG
    )
    const iconName = computed(() =>
      isSvgComponent(props.icon) ? null : props.icon
    )

    return {
      iconName,
      styles,
      component
    }
  }
})
</script>
