<template>
  <ak-group title="Sticky View">
    <ak-sticky-view
      class="exp-sticky-box"
      v-model="activeName"
      @change="onChange"
    >
      <ak-sticky-view-item v-for="i in 4" :key="i" :name="`Sticky ${i}`">
        <div :class="`exp-sticky-box-${i}`"></div>
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
    const activeName = ref('')

    const onChange: StickyViewOnChange = (name, index) => {
      console.log('change', name, index)
    }

    return {
      activeName,

      onChange
    }
  }
})
</script>
