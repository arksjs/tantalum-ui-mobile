<template>
  <ta-group title="基础用法">
    <ta-cell label="pattern=light" class="exp-tag-compact-box">
      <ta-tag type="default">default</ta-tag>
      <ta-tag type="primary">primary</ta-tag>
      <ta-tag type="success">success</ta-tag>
      <ta-tag type="warning">warning</ta-tag>
      <ta-tag type="danger">danger</ta-tag>
    </ta-cell>
    <ta-cell label="pattern=dark" class="exp-tag-compact-box">
      <ta-tag type="default" pattern="dark">default</ta-tag>
      <ta-tag type="primary" pattern="dark">primary</ta-tag>
      <ta-tag type="success" pattern="dark">success</ta-tag>
      <ta-tag type="warning" pattern="dark">warning</ta-tag>
      <ta-tag type="danger" pattern="dark">danger</ta-tag>
    </ta-cell>
    <ta-cell label="pattern=plain" class="exp-tag-compact-box">
      <ta-tag type="default" pattern="plain">default</ta-tag>
      <ta-tag type="primary" pattern="plain">primary</ta-tag>
      <ta-tag type="success" pattern="plain">success</ta-tag>
      <ta-tag type="warning" pattern="plain">warning</ta-tag>
      <ta-tag type="danger" pattern="plain">danger</ta-tag>
    </ta-cell>
  </ta-group>
  <ta-group title="自定义颜色">
    <ta-cell label="长春花色#6667AB">
      <ta-tag type="default" pattern="plain" color="#6667AB">plain</ta-tag>
    </ta-cell>
    <ta-cell label="莲花色#E2C0BF">
      <ta-tag type="default" color="#6667AB">dark</ta-tag>
      <ta-tag type="default" closable color="#E2C0BF">light</ta-tag>
    </ta-cell>
  </ta-group>
  <ta-group title="标签大小">
    <ta-cell label="size=small">
      <ta-tag type="primary" pattern="light" size="small">标签</ta-tag>
      <ta-tag type="primary" pattern="dark" size="small">标签</ta-tag>
      <ta-tag type="primary" pattern="plain" size="small">标签</ta-tag>
    </ta-cell>
    <ta-cell label="size=middle">
      <ta-tag type="primary" pattern="light" size="middle">标签</ta-tag>
      <ta-tag type="primary" pattern="dark" size="middle">标签</ta-tag>
      <ta-tag type="primary" pattern="plain" size="middle">标签</ta-tag>
    </ta-cell>
    <ta-cell label="size=large">
      <ta-tag type="primary" pattern="light" size="large">标签</ta-tag>
      <ta-tag type="primary" pattern="dark" size="large">标签</ta-tag>
      <ta-tag type="primary" pattern="plain" size="large">标签</ta-tag>
    </ta-cell>
  </ta-group>
  <ta-group title="其他">
    <ta-cell label="可关闭的">
      <ta-tag type="primary" pattern="dark" size="large" closable> 标签 </ta-tag>
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="click & close &long-press">
      <ta-tag
        type="default"
        size="large"
        closable
        @click="showToast('点击事件')"
        @close="showToast('关闭事件')"
        @long-press="showToast('长按事件')"
      >
        标签
      </ta-tag>
    </ta-cell>
  </ta-group>
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
