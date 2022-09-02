<template>
  <ak-group title="基础用法">
    <ak-notice-bar class="exp-noticeBar-item" :title="text1" />
    <ak-notice-bar class="exp-noticeBar-item" :title="text2" />
  </ak-group>
  <ak-group title="跑马灯">
    <ak-notice-bar class="exp-noticeBar-item" marquee :title="text2">
    </ak-notice-bar>
  </ak-group>
  <ak-group title="左侧图标">
    <ak-notice-bar
      class="exp-noticeBar-item"
      left-icon="SoundOutlined"
      :title="text1"
      marquee
    />
  </ak-group>
  <ak-group title="mode closable/clickable">
    <ak-notice-bar
      class="exp-noticeBar-item"
      mode="closable"
      :title="text1"
      @closeClick="showToast('点击了关闭按钮')"
    />
    <ak-notice-bar
      class="exp-noticeBar-item"
      mode="clickable"
      :title="text1"
      @click="() => showToast('点击了通告栏')"
    />
  </ak-group>
  <ak-group title="type=success/primary/danger">
    <ak-notice-bar
      left-icon="SoundOutlined"
      class="exp-noticeBar-item"
      type="success"
      :title="text1"
    />
    <ak-notice-bar
      left-icon="SoundOutlined"
      class="exp-noticeBar-item"
      type="primary"
      :title="text1"
    />
    <ak-notice-bar
      left-icon="SoundOutlined"
      class="exp-noticeBar-item"
      type="danger"
      :title="text1"
    />
  </ak-group>
  <ak-group title="自定义颜色(#000000)">
    <ak-notice-bar
      class="exp-noticeBar-item"
      left-icon="SoundOutlined"
      :title="text1"
      color="#000000"
    />
  </ak-group>
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
