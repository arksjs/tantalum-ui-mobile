<template>
  <fx-group title="基础用法">
    <fx-swipe-cell :buttons="buttons">
      <fx-cell label="单元格" content="向左划"></fx-cell>
    </fx-swipe-cell>
  </fx-group>
  <fx-group title=" 事件监听">
    <fx-swipe-cell :buttons="buttons" @buttonClick="onButtonClick">
      <fx-cell label="单元格" content="向左划"></fx-cell>
    </fx-swipe-cell>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  showToast,
  SwipeCellButtonOption,
  SwipeCellOnButtonClick
} from '@/index'

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
