<template>
  <ta-group title="基本用法">
    <ta-watermark :content="['姓名', '188****8888']">
      <div style="height: 500px"></div>
    </ta-watermark>
  </ta-group>
</template>

<script lang="ts">
import { showToast } from '@/index'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpWatermark',
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
