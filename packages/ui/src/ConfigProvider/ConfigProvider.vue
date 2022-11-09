<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { LangPack } from '../locale/types'
import { useConfigProvider } from './context'

export default defineComponent({
  name: 'ta-config-provider',
  props: {
    locale: {
      type: Object as PropType<LangPack>
    }
  },
  setup(props) {
    useConfigProvider(props)
  }
})
</script>
