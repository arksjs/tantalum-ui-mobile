<template>
  <ta-group title="Sticky View">
    <ta-sticky-view
      ref="viewRef"
      class="exp-sticky-box"
      v-model="activeName"
      @change="onChange"
    >
      <ta-sticky-view-item v-for="i in 4" :key="i" :name="`Sticky ${i}`">
        <div :class="`exp-sticky-box-${i}`"></div>
      </ta-sticky-view-item>
    </ta-sticky-view>
    <!-- <div class="exp-sticky-box" id="stickyContainer">
      <div class="exp-sticky-header">
        头部
      </div>
      <div class="exp-sticky-box-1">
        <ta-sticky-view :container="'#stickyContainer'" :offset-top="50">哈哈哈</ta-sticky-view>
      </div>
    </div> -->
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type { StickyViewOnChange, StickyViewRef } from '@/index'

export default defineComponent({
  name: 'ExpSticky',
  setup() {
    const activeName = ref('Sticky 1')
    const viewRef = ref<StickyViewRef | null>(null)

    const onChange: StickyViewOnChange = (name, index) => {
      console.log('change', name, index)
    }

    onMounted(() => {
      // viewRef.value?.scrollTo("Sticky 2")
    })

    return {
      viewRef,
      activeName,

      onChange
    }
  }
})
</script>
