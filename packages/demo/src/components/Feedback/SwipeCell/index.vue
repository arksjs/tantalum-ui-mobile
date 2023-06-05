<template>
  <ta-group title="基础用法">
    <ta-swipe-cell :buttons="buttons">
      <ta-cell label="单元格" content="向左划"></ta-cell>
    </ta-swipe-cell>
  </ta-group>
  <ta-group title=" 事件监听">
    <ta-swipe-cell :buttons="buttons" @buttonClick="onButtonClick">
      <ta-cell label="单元格" content="向左划"></ta-cell>
    </ta-swipe-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast, type SwipeCellButtonOption, type SwipeCellOnButtonClick } from '@/index'

export default defineComponent({
  name: 'ExpSwipeCell',
  setup() {
    const buttons: SwipeCellButtonOption[] = [
      {
        text: '加入收藏',
        type: 'warning'
      },
      {
        text: '删除',
        type: 'danger'
      }
    ]

    const onButtonClick: SwipeCellOnButtonClick = e => {
      console.log('button-click', e)
      showToast(`点击了 ${e.item.text}`)
    }

    return {
      buttons,
      onButtonClick
    }
  }
})
</script>
