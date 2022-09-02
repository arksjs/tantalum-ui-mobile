<template>
  <ak-group title="基本用法">
    <div class="exp-copy-pad">
      <ak-copy class="exp-copy-box" text="复制的文本">
        <ak-button type="primary">点击复制</ak-button>
      </ak-copy>
    </div>
  </ak-group>
  <ak-group title="事件监听">
    <div class="exp-copy-pad">
      <ak-copy
        class="exp-copy-box"
        text="复制的文本2"
        @success="onSuccess"
        @error="onError"
      >
        <ak-button type="primary">点击复制</ak-button>
      </ak-copy>
    </div>
  </ak-group>
</template>

<script lang="ts">
import { showToast } from '@/index'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpCopy',
  setup() {
    const onSuccess = (text: string) => {
      showToast({
        title: `${text}`,
        type: 'success'
      })
    }

    const onError = (error: Error) => {
      showToast({
        title: error.message,
        type: 'fail'
      })
    }

    return {
      onSuccess,
      onError
    }
  }
})
</script>
