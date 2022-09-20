<template>
  <ak-group title="Sticky View">
    <ak-sticky-view
      class="exp-sticky-box"
      v-model:activeIndex="activeIndex"
      @change="onChange"
    >
      <ak-sticky-view-item name="Sticky 1">
        <div class="exp-sticky-box-1"></div>
      </ak-sticky-view-item>
      <ak-sticky-view-item name="Sticky 2">
        <div class="exp-sticky-box-2"></div>
      </ak-sticky-view-item>
      <ak-sticky-view-item name="Sticky 3">
        <div class="exp-sticky-box-3"></div>
      </ak-sticky-view-item>
      <ak-sticky-view-item name="Sticky 4">
        <div class="exp-sticky-box-4"></div>
      </ak-sticky-view-item>
    </ak-sticky-view>
    <!-- <div class="exp-sticky-box" id="stickyContainer">
      <div class="exp-sticky-header">
        头部
      </div>
      <div class="exp-sticky-box-1">
        <ak-sticky-view :container="'#stickyContainer'" :offset-top="50">哈哈哈</ak-sticky-view>
      </div>
    </div> -->
  </ak-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { StickyViewOnChange } from '@/index'

export default defineComponent({
  name: 'ExpSticky',
  setup() {
    const activeIndex = ref(0)

    const onChange: StickyViewOnChange = res => {
      console.log('change', res)
    }

    return {
      activeIndex,

      onChange
    }
  }
})
</script>
