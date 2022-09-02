<template>
  <ak-group title="基础用法">
    <!-- <div class="exp-scrollTab-header">占位头部</div> -->
    <ak-scroll-tab
      class="exp-scrollTab-boxs"
      :stickyOffsetTop="offsetTop"
      :stickyOffsetBottom="offsetBottom"
      @change="onChange"
    >
      <ak-scroll-tab-item name="Dust Red">
        <div class="exp-scrollTab-box box-1"></div>
      </ak-scroll-tab-item>
      <ak-scroll-tab-item name="Volcano">
        <div class="exp-scrollTab-box box-2"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Sunset Orange">
        <div class="exp-scrollTab-box box-3"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Calendula Gold">
        <div class="exp-scrollTab-box box-4"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Sunrise Yellow">
        <div class="exp-scrollTab-box box-5"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Lime">
        <div class="exp-scrollTab-box box-6"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Polar Green">
        <div class="exp-scrollTab-box box-7"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Cyan">
        <div class="exp-scrollTab-box box-8"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Daybreak Blue">
        <div class="exp-scrollTab-box box-9"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Geek Blue">
        <div class="exp-scrollTab-box box-10"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Golden Purple">
        <div class="exp-scrollTab-box box-11"></div
      ></ak-scroll-tab-item>
      <ak-scroll-tab-item name="Magenta">
        <div class="exp-scrollTab-box box-12"></div
      ></ak-scroll-tab-item>
    </ak-scroll-tab>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ScrollTabOnChange } from '@/index'

export default defineComponent({
  name: 'ExpScrollTab',
  setup() {
    const onChange: ScrollTabOnChange = res => {
      console.log('change', res)
    }

    return {
      offsetTop: 52,
      offsetBottom: 12,

      onChange
    }
  }
})
</script>
