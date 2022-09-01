<template>
  <fx-group title="基础用法">
    <fx-cell label="pattern=light" class="exp-tag-compact-box">
      <fx-tag type="default">default</fx-tag>
      <fx-tag type="primary">primary</fx-tag>
      <fx-tag type="success">success</fx-tag>
      <fx-tag type="warning">warning</fx-tag>
      <fx-tag type="danger">danger</fx-tag>
    </fx-cell>
    <fx-cell label="pattern=dark" class="exp-tag-compact-box">
      <fx-tag type="default" pattern="dark">default</fx-tag>
      <fx-tag type="primary" pattern="dark">primary</fx-tag>
      <fx-tag type="success" pattern="dark">success</fx-tag>
      <fx-tag type="warning" pattern="dark">warning</fx-tag>
      <fx-tag type="danger" pattern="dark">danger</fx-tag>
    </fx-cell>
    <fx-cell label="pattern=plain" class="exp-tag-compact-box">
      <fx-tag type="default" pattern="plain">default</fx-tag>
      <fx-tag type="primary" pattern="plain">primary</fx-tag>
      <fx-tag type="success" pattern="plain">success</fx-tag>
      <fx-tag type="warning" pattern="plain">warning</fx-tag>
      <fx-tag type="danger" pattern="plain">danger</fx-tag>
    </fx-cell>
  </fx-group>
  <fx-group title="自定义颜色">
    <fx-cell label="长春花色#6667AB">
      <fx-tag type="default" pattern="plain" color="#6667AB">plain</fx-tag>
    </fx-cell>
    <fx-cell label="莲花色#E2C0BF">
      <fx-tag type="default" color="#6667AB">dark</fx-tag>
      <fx-tag type="default" closable color="#E2C0BF">light</fx-tag>
    </fx-cell>
  </fx-group>
  <fx-group title="标签大小">
    <fx-cell label="size=small">
      <fx-tag type="primary" pattern="light" size="small">标签</fx-tag>
      <fx-tag type="primary" pattern="dark" size="small">标签</fx-tag>
      <fx-tag type="primary" pattern="plain" size="small">标签</fx-tag>
    </fx-cell>
    <fx-cell label="size=middle">
      <fx-tag type="primary" pattern="light" size="middle">标签</fx-tag>
      <fx-tag type="primary" pattern="dark" size="middle">标签</fx-tag>
      <fx-tag type="primary" pattern="plain" size="middle">标签</fx-tag>
    </fx-cell>
    <fx-cell label="size=large">
      <fx-tag type="primary" pattern="light" size="large">标签</fx-tag>
      <fx-tag type="primary" pattern="dark" size="large">标签</fx-tag>
      <fx-tag type="primary" pattern="plain" size="large">标签</fx-tag>
    </fx-cell>
  </fx-group>
  <fx-group title="其他">
    <fx-cell label="可关闭的">
      <fx-tag type="primary" pattern="dark" size="large" closable>
        标签
      </fx-tag>
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="click & close &long-press">
      <fx-tag
        type="default"
        closable
        @click="showToast('点击事件')"
        @close="showToast('关闭事件')"
        @long-press="showToast('长按事件')"
      >
        标签
      </fx-tag>
    </fx-cell>
  </fx-group>
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
