<template>
  <ta-group title="基础用法">
    <ta-notice-bar class="exp-noticeBar-item" :title="text1" />
    <ta-notice-bar class="exp-noticeBar-item" :title="text2" />
  </ta-group>
  <ta-group title="跑马灯">
    <ta-notice-bar class="exp-noticeBar-item" marquee :title="text2">
    </ta-notice-bar>
  </ta-group>
  <ta-group title="左侧图标">
    <ta-notice-bar
      class="exp-noticeBar-item"
      left-icon="SoundOutlined"
      :title="text1"
      marquee
    />
  </ta-group>
  <ta-group title="mode closable/clickable">
    <ta-notice-bar
      class="exp-noticeBar-item"
      mode="closable"
      :title="text1"
      @closeClick="showToast('点击了关闭按钮')"
    />
    <ta-notice-bar
      class="exp-noticeBar-item"
      mode="clickable"
      :title="text1"
      @click="() => showToast('点击了通告栏')"
    />
  </ta-group>
  <ta-group title="type=success/primary/danger">
    <ta-notice-bar
      left-icon="SoundOutlined"
      class="exp-noticeBar-item"
      type="success"
      :title="text1"
    />
    <ta-notice-bar
      left-icon="SoundOutlined"
      class="exp-noticeBar-item"
      type="primary"
      :title="text1"
    />
    <ta-notice-bar
      left-icon="SoundOutlined"
      class="exp-noticeBar-item"
      type="danger"
      :title="text1"
    />
  </ta-group>
  <ta-group title="自定义颜色(#000000)">
    <ta-notice-bar
      class="exp-noticeBar-item"
      left-icon="SoundOutlined"
      :title="text1"
      color="#000000"
    />
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpNoticeBar',
  setup() {
    return {
      text1: '简单不先于复杂，而是在复杂之后。',
      text2:
        '作为一个真正的程序员，首先应该尊重编程，热爱你所写下的程序，他是你的伙伴，而不是工具。',
      showToast
    }
  }
})
</script>
