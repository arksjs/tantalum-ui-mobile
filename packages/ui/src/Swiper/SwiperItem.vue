<template>
  <div class="ak-swiper-item" ref="root">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useListItem } from '../hooks/use-list'

export default defineComponent({
  name: 'ak-swiper-item',
  setup() {
    const root = shallowRef<HTMLElement | null>(null)

    useListItem('swiper')

    // onUpdated(() => {
    //   const $item = root.value as HTMLElement

    //   if ($item.offsetWidth === 0 || $item.offsetHeight === 0) {
    //     // 解决默认 hidden 的问题
    //     update()
    //   }
    // })

    return {
      root
    }
  }
})
</script>
