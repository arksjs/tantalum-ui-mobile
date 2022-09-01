<template>
  <fx-group title="基础用法">
    <fx-cell
      label="纯文字"
      isLink
      @click="onShowToast({ title: '提示文本' })"
    ></fx-cell>
    <fx-cell
      label="长文字"
      isLink
      @click="
        onShowToast({ title: '提示文本提示文本提示文本提示文本提示文本' })
      "
    ></fx-cell>
    <fx-cell
      label="成功"
      isLink
      @click="onShowToast({ title: '成功文本', type: 'success' })"
    ></fx-cell>
    <fx-cell
      label="失败"
      isLink
      @click="onShowToast({ title: '失败文本', type: 'fail' })"
    ></fx-cell>
    <fx-cell
      label="加载中"
      isLink
      @click="onShowToast({ title: '加载文本', type: 'loading' })"
    ></fx-cell>
  </fx-group>
  <fx-group title="自定义图标">
    <fx-cell
      label="收藏"
      isLink
      @click="onShowToast({ title: '已收藏', icon: 'StarFilled' })"
    ></fx-cell>
    <fx-cell
      label="警告"
      isLink
      @click="
        onShowToast({ title: '警告文本', icon: 'ExclamationCircleOutlined' })
      "
    ></fx-cell>
  </fx-group>
  <fx-group title="其他">
    <fx-cell
      label="自定义时长"
      isLink
      @click="onShowToast({ title: '5秒后消失', duration: 5000 })"
    ></fx-cell>
    <fx-cell
      label="展示透明蒙层"
      isLink
      @click="onShowToast({ title: '不可穿透', showMask: true })"
    ></fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell
      label="showToast"
      isLink
      @click="showToast({ title: '提示文本', duration: 5000 })"
    ></fx-cell>
    <fx-cell label="hideToast" isLink @click="hideToast()"></fx-cell>
    <fx-cell
      label="showLoading"
      isLink
      @click="showLoading({ title: '加载中' })"
    ></fx-cell>
    <fx-cell label="hideLoading" isLink @click="hideLoading()"></fx-cell>
  </fx-group>
  <fx-toast
    v-model:visible="visible"
    :title="title"
    :type="type"
    :showMask="showMask"
    :icon="icon"
    :duration="duration"
  ></fx-toast>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  showToast,
  showLoading,
  hideToast,
  hideLoading,
  ToastType
} from '@/index'

interface showArgs {
  icon?: any
  title?: string
  showMask?: boolean
  type?: ToastType
  duration?: number
}

export default defineComponent({
  name: 'ExpToast',
  setup() {
    const visible = ref(false)
    const title = ref('')
    const type = ref<ToastType>('default')
    const showMask = ref(false)
    const icon = ref()
    const duration = ref(0)

    function onShowToast(args: showArgs) {
      icon.value = args.icon || undefined
      title.value = args.title || ''
      showMask.value = args.showMask || false
      type.value = args.type || 'default'
      duration.value = args.duration ?? 1500
      visible.value = true
    }

    return {
      visible,
      title,
      type,
      showMask,
      icon,
      duration,

      onShowToast,
      showToast,
      showLoading,
      hideToast,
      hideLoading
    }
  }
})
</script>
