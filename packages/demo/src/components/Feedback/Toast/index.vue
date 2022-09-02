<template>
  <ak-group title="基础用法">
    <ak-cell
      label="纯文字"
      isLink
      @click="onShowToast({ title: '提示文本' })"
    ></ak-cell>
    <ak-cell
      label="长文字"
      isLink
      @click="
        onShowToast({ title: '提示文本提示文本提示文本提示文本提示文本' })
      "
    ></ak-cell>
    <ak-cell
      label="成功"
      isLink
      @click="onShowToast({ title: '成功文本', type: 'success' })"
    ></ak-cell>
    <ak-cell
      label="失败"
      isLink
      @click="onShowToast({ title: '失败文本', type: 'fail' })"
    ></ak-cell>
    <ak-cell
      label="加载中"
      isLink
      @click="onShowToast({ title: '加载文本', type: 'loading' })"
    ></ak-cell>
  </ak-group>
  <ak-group title="自定义图标">
    <ak-cell
      label="收藏"
      isLink
      @click="onShowToast({ title: '已收藏', icon: 'StarFilled' })"
    ></ak-cell>
    <ak-cell
      label="警告"
      isLink
      @click="
        onShowToast({ title: '警告文本', icon: 'ExclamationCircleOutlined' })
      "
    ></ak-cell>
  </ak-group>
  <ak-group title="其他">
    <ak-cell
      label="自定义时长"
      isLink
      @click="onShowToast({ title: '5秒后消失', duration: 5000 })"
    ></ak-cell>
    <ak-cell
      label="展示透明蒙层"
      isLink
      @click="onShowToast({ title: '不可穿透', showMask: true })"
    ></ak-cell>
  </ak-group>
  <ak-group title="API">
    <ak-cell
      label="showToast"
      isLink
      @click="showToast({ title: '提示文本', duration: 5000 })"
    ></ak-cell>
    <ak-cell label="hideToast" isLink @click="hideToast()"></ak-cell>
    <ak-cell
      label="showLoading"
      isLink
      @click="showLoading({ title: '加载中' })"
    ></ak-cell>
    <ak-cell label="hideLoading" isLink @click="hideLoading()"></ak-cell>
  </ak-group>
  <ak-toast
    v-model:visible="visible"
    :title="title"
    :type="type"
    :showMask="showMask"
    :icon="icon"
    :duration="duration"
  ></ak-toast>
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
