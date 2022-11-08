<template>
  <ta-group title="基础用法">
    <ta-cell label="默认" isLink @click="visible = true"></ta-cell>
    <ta-cell
      label="蒙层可点击"
      isLink
      @click="
        () => {
          maskClosable = true
          visible = true
        }
      "
    ></ta-cell>
    <ta-cell
      label="隐藏关闭按钮"
      isLink
      @click="
        () => {
          maskClosable = true
          showClose = false
          visible = true
        }
      "
    ></ta-cell>
  </ta-group>
  <ta-group title="Slot default">
    <ta-cell label="图片" isLink @click="visible2 = true"></ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell
      label="cancel"
      isLink
      @click="
        () => {
          callbackEvent = true
          maskClosable = true
          visible = true
        }
      "
    ></ta-cell>
    <ta-cell
      label="visible-state-change"
      isLink
      @click="
        () => {
          visibleEvent = true
          visible = true
        }
      "
    ></ta-cell>
  </ta-group>
  <ta-modal
    v-model:visible="visible"
    :maskClosable="maskClosable"
    :showClose="showClose"
    @cancel="onClose"
    @visibleStateChange="onVisibleStateChange"
  >
  </ta-modal>
  <ta-modal v-model:visible="visible2">
    <ta-image
      class="exp-image-image"
      :src="imageUrl"
      :aspectRatio="1"
    ></ta-image>
  </ta-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  type PopupOnCancel,
  type PopupOnVisibleStateChange,
  showToast
} from '@/index'

export default defineComponent({
  name: 'ExpModal',
  setup() {
    const visible = ref(false)
    const maskClosable = ref(false)
    const showClose = ref(true)
    const callbackEvent = ref(false)
    const visibleEvent = ref(false)
    const visible2 = ref(false)

    const onVisibleStateChange: PopupOnVisibleStateChange = ({ state }) => {
      if (visibleEvent.value) {
        console.log('visible-state-change', state)
        showToast(`${state} 事件触发`)
      }
      if (state === 'hidden') {
        callbackEvent.value = false
        visibleEvent.value = false
        maskClosable.value = false
        showClose.value = true
      }
    }

    const onClose: PopupOnCancel = res => {
      console.log('cancel', res)
      if (callbackEvent.value) {
        if (res.source === 'closeClick') {
          showToast('点击了关闭按钮')
        } else if (res.source === 'maskClick') {
          showToast('点击了蒙层')
        }
      }
    }

    return {
      visible,
      maskClosable,
      showClose,

      callbackEvent,
      visibleEvent,

      visible2,
      imageUrl: 'https://cdn.fox2.cn/vfox/swiper/center-2.jpg',

      onVisibleStateChange,
      onClose
    }
  }
})
</script>
