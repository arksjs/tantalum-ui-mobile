<template>
  <div class="ta-empty">
    <slot name="image" v-if="$slots.image"></slot>
    <template v-else>
      <img class="ta-empty_image" :src="imageUrl" />
    </template>
    <p class="ta-empty_description" v-if="description">
      {{ description }}
    </p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import { createEnumsValidator } from '../helpers/validator'
import type { EmptyType } from './types'
import { getImageUrl, TYPE_NAMES } from './util'

export default defineComponent({
  name: 'ta-empty',
  props: {
    // 描述文字
    description: {
      type: String,
      default: ''
    },
    // 类型
    type: {
      type: String as PropType<EmptyType>,
      validator: createEnumsValidator(TYPE_NAMES),
      default: TYPE_NAMES[0]
    }
  },
  setup(props) {
    const imageUrl = computed(() => getImageUrl(props.type))

    return {
      imageUrl
    }
  }
})
</script>
