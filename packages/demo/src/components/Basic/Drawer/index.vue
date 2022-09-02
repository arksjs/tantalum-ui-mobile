<template>
  <ak-group title="基础用法">
    <ak-cell
      label="顶部弹出"
      isLink
      @click="show({ title: '顶部弹出', placement: 'top' })"
    ></ak-cell>
    <ak-cell
      label="底部弹出"
      isLink
      @click="show({ title: '底部弹出', placement: 'bottom' })"
    ></ak-cell>
    <ak-cell
      label="左侧弹出"
      isLink
      @click="show({ title: '左侧弹出', placement: 'left' })"
    ></ak-cell>
    <ak-cell
      label="右侧弹出"
      isLink
      @click="show({ title: '右侧弹出', placement: 'right' })"
    ></ak-cell>
  </ak-group>
  <ak-group title="无标题">
    <ak-cell
      label="底部弹出"
      isLink
      @click="show({ placement: 'bottom' })"
    ></ak-cell>
    <ak-cell
      label="右侧弹出"
      isLink
      @click="show({ placement: 'right' })"
    ></ak-cell>
  </ak-group>
  <ak-group title="展示关闭按钮">
    <ak-cell
      label="有标题-底部"
      isLink
      @click="show({ title: '标题', placement: 'bottom', showClose: true })"
    ></ak-cell>
    <ak-cell
      label="有标题-右侧"
      isLink
      @click="show({ title: '标题', placement: 'right', showClose: true })"
    ></ak-cell>
    <ak-cell
      label="无标题"
      isLink
      @click="show({ placement: 'bottom', showClose: true })"
    ></ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell
      label="visible-state-change"
      isLink
      @click="
        show({
          title: '标题',
          placement: 'bottom',
          showClose: true,
          visibleEvent: true
        })
      "
    ></ak-cell>
    <ak-cell
      label="cancel"
      isLink
      @click="
        show({
          title: '标题',
          placement: 'bottom',
          showClose: true,
          cancelEvent: true
        })
      "
    ></ak-cell>
  </ak-group>
  <ak-drawer
    v-model:visible="drawerVisible"
    :title="title"
    :placement="placement"
    :showClose="showClose"
    @visibleStateChange="onVisibleStateChange"
    @cancel="onCancel"
  ></ak-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  PlacementType,
  showToast,
  PopupOnVisibleStateChange,
  PopupOnCancel
} from '@/index'

interface showArgs {
  title?: string
  placement?: PlacementType
  showClose?: boolean
  visibleEvent?: boolean
  cancelEvent?: boolean
}

export default defineComponent({
  name: 'ExpDrawer',
  setup() {
    const drawerVisible = ref(false)
    const title = ref('')
    const placement = ref<PlacementType>('top')
    const showClose = ref(false)
    const visibleEvent = ref(false)
    const cancelEvent = ref(false)

    function show(args: showArgs) {
      title.value = args.title || ''
      placement.value = args.placement || 'top'
      showClose.value = args.showClose || false
      visibleEvent.value = !!args.visibleEvent
      cancelEvent.value = !!args.cancelEvent
      drawerVisible.value = true
    }

    const onVisibleStateChange: PopupOnVisibleStateChange = ({ state }) => {
      if (visibleEvent.value) {
        showToast(`${state} 事件触发`)
        console.log('visible-state-change', state)
      }
    }

    const onCancel: PopupOnCancel = res => {
      if (cancelEvent.value) {
        showToast('取消')
        console.log('cancel', res)
      }
    }

    return {
      drawerVisible,
      title,
      placement,
      showClose,

      show,
      onVisibleStateChange,
      onCancel
    }
  }
})
</script>
