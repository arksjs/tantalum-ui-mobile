<template>
  <fx-group title="基础用法">
    <fx-cell label="默认" isLink @click="visible = true"></fx-cell>
    <fx-cell
      label="蒙层可点击"
      isLink
      @click="
        () => {
          maskClosable = true
          visible = true
        }
      "
    ></fx-cell>
    <fx-cell
      label="隐藏关闭按钮"
      isLink
      @click="
        () => {
          maskClosable = true
          showClose = false
          visible = true
        }
      "
    ></fx-cell>
  </fx-group>
  <fx-group title="Slot default">
    <fx-cell label="图片" isLink @click="visible2 = true"></fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell
      label="cancel"
      isLink
      @click="
        () => {
          callbackEvent = true
          maskClosable = true
          visible = true
        }
      "
    ></fx-cell>
    <fx-cell
      label="visible-state-change"
      isLink
      @click="
        () => {
          visibleEvent = true
        }
      "
    ></fx-cell>
  </fx-group>
  <fx-modal
    v-model:visible="visible"
    :maskClosable="maskClosable"
    :showClose="showClose"
    @cancel="onClose"
    @visibleStateChange="onVisibleStateChange"
  >
  </fx-modal>
  <fx-modal v-model:visible="visible2">
    <fx-image
      class="exp-image-image"
      :src="imageUrl"
      :aspectRatio="1"
    ></fx-image>
  </fx-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PopupOnCancel, PopupOnVisibleStateChange, showToast } from '@/index'

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
