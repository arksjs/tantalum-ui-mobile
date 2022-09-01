<template>
  <fx-group title="基本用法">
    <div class="exp-copy-pad">
      <fx-copy class="exp-copy-box" text="复制的文本">
        <fx-button type="primary">点击复制</fx-button>
      </fx-copy>
    </div>
  </fx-group>
  <fx-group title="事件监听">
    <div class="exp-copy-pad">
      <fx-copy
        class="exp-copy-box"
        text="复制的文本2"
        @success="onSuccess"
        @error="onError"
      >
        <fx-button type="primary">点击复制</fx-button>
      </fx-copy>
    </div>
  </fx-group>
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
