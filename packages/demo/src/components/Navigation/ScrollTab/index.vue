<template>
  <ta-group title="基础用法">
    <!-- <div class="exp-scrollTab-header">占位头部</div> -->
    <ta-scroll-tab
      ref="scrollTabRef"
      class="exp-scrollTab-boxs"
      v-model="value"
      :stickyOffsetTop="offsetTop"
      :stickyOffsetBottom="offsetBottom"
      @change="onChange"
    >
      <ta-scroll-tab-item name="Dust Red">
        <div class="exp-scrollTab-box box-1"></div>
      </ta-scroll-tab-item>
      <ta-scroll-tab-item name="Volcano">
        <div class="exp-scrollTab-box box-2"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Sunset Orange">
        <div class="exp-scrollTab-box box-3"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Calendula Gold">
        <div class="exp-scrollTab-box box-4"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Sunrise Yellow">
        <div class="exp-scrollTab-box box-5"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Lime">
        <div class="exp-scrollTab-box box-6"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Polar Green">
        <div class="exp-scrollTab-box box-7"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Cyan">
        <div class="exp-scrollTab-box box-8"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Daybreak Blue">
        <div class="exp-scrollTab-box box-9"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Geek Blue">
        <div class="exp-scrollTab-box box-10"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Golden Purple">
        <div class="exp-scrollTab-box box-11"></div
      ></ta-scroll-tab-item>
      <ta-scroll-tab-item name="Magenta">
        <div class="exp-scrollTab-box box-12"></div
      ></ta-scroll-tab-item>
    </ta-scroll-tab>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type { ScrollTabOnChange, ScrollTabRef } from '@/index'

export default defineComponent({
  name: 'ExpScrollTab',
  setup() {
    const scrollTabRef = ref<ScrollTabRef | null>(null)
    const value = ref('Dust Red')

    const onChange: ScrollTabOnChange = res => {
      console.log('change', res)
    }

    onMounted(() => {
      // scrollTabRef.value?.scrollToIndex(2)
    })

    return {
      value,
      scrollTabRef,

      offsetTop: 52,
      offsetBottom: 12,

      onChange
    }
  }
})
</script>
