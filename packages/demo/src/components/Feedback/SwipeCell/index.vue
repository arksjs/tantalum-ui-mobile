<template>
  <ak-group title="基础用法">
    <ak-swipe-cell :buttons="buttons">
      <ak-cell label="单元格" content="向左划"></ak-cell>
    </ak-swipe-cell>
  </ak-group>
  <ak-group title=" 事件监听">
    <ak-swipe-cell :buttons="buttons" @buttonClick="onButtonClick">
      <ak-cell label="单元格" content="向左划"></ak-cell>
    </ak-swipe-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  showToast,
  type SwipeCellButtonOption,
  type SwipeCellOnButtonClick
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
