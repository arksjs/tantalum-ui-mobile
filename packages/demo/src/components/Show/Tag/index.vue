<template>
  <ak-group title="基础用法">
    <ak-cell label="pattern=light" class="exp-tag-compact-box">
      <ak-tag type="default">default</ak-tag>
      <ak-tag type="primary">primary</ak-tag>
      <ak-tag type="success">success</ak-tag>
      <ak-tag type="warning">warning</ak-tag>
      <ak-tag type="danger">danger</ak-tag>
    </ak-cell>
    <ak-cell label="pattern=dark" class="exp-tag-compact-box">
      <ak-tag type="default" pattern="dark">default</ak-tag>
      <ak-tag type="primary" pattern="dark">primary</ak-tag>
      <ak-tag type="success" pattern="dark">success</ak-tag>
      <ak-tag type="warning" pattern="dark">warning</ak-tag>
      <ak-tag type="danger" pattern="dark">danger</ak-tag>
    </ak-cell>
    <ak-cell label="pattern=plain" class="exp-tag-compact-box">
      <ak-tag type="default" pattern="plain">default</ak-tag>
      <ak-tag type="primary" pattern="plain">primary</ak-tag>
      <ak-tag type="success" pattern="plain">success</ak-tag>
      <ak-tag type="warning" pattern="plain">warning</ak-tag>
      <ak-tag type="danger" pattern="plain">danger</ak-tag>
    </ak-cell>
  </ak-group>
  <ak-group title="自定义颜色">
    <ak-cell label="长春花色#6667AB">
      <ak-tag type="default" pattern="plain" color="#6667AB">plain</ak-tag>
    </ak-cell>
    <ak-cell label="莲花色#E2C0BF">
      <ak-tag type="default" color="#6667AB">dark</ak-tag>
      <ak-tag type="default" closable color="#E2C0BF">light</ak-tag>
    </ak-cell>
  </ak-group>
  <ak-group title="标签大小">
    <ak-cell label="size=small">
      <ak-tag type="primary" pattern="light" size="small">标签</ak-tag>
      <ak-tag type="primary" pattern="dark" size="small">标签</ak-tag>
      <ak-tag type="primary" pattern="plain" size="small">标签</ak-tag>
    </ak-cell>
    <ak-cell label="size=middle">
      <ak-tag type="primary" pattern="light" size="middle">标签</ak-tag>
      <ak-tag type="primary" pattern="dark" size="middle">标签</ak-tag>
      <ak-tag type="primary" pattern="plain" size="middle">标签</ak-tag>
    </ak-cell>
    <ak-cell label="size=large">
      <ak-tag type="primary" pattern="light" size="large">标签</ak-tag>
      <ak-tag type="primary" pattern="dark" size="large">标签</ak-tag>
      <ak-tag type="primary" pattern="plain" size="large">标签</ak-tag>
    </ak-cell>
  </ak-group>
  <ak-group title="其他">
    <ak-cell label="可关闭的">
      <ak-tag type="primary" pattern="dark" size="large" closable>
        标签
      </ak-tag>
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="click & close &long-press">
      <ak-tag
        type="default"
        closable
        @click="showToast('点击事件')"
        @close="showToast('关闭事件')"
        @long-press="showToast('长按事件')"
      >
        标签
      </ak-tag>
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpTag',
  setup() {
    return {
      showToast
    }
  }
})
</script>
