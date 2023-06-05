<template>
  <ta-group title="基础用法">
    <ta-cell label="主要" isLink @click="show({ title: '通知文本' })"></ta-cell>
    <ta-cell label="成功" isLink @click="show({ title: '成功文本', type: 'success' })"></ta-cell>
    <ta-cell label="警告" isLink @click="show({ title: '警告文本', type: 'warning' })"></ta-cell>
    <ta-cell label="危险" isLink @click="show({ title: '危险文本', type: 'danger' })"></ta-cell>
  </ta-group>
  <ta-group title="自定义图标">
    <ta-cell
      label="成功"
      isLink
      @click="
        show({
          title: '成功文本',
          type: 'success',
          icon: 'CheckCircleOutlined'
        })
      "
    ></ta-cell>
    <ta-cell
      label="警告"
      isLink
      @click="
        show({
          title: '警告文本',
          type: 'warning',
          icon: 'ExclamationCircleOutlined'
        })
      "
    ></ta-cell>
    <ta-cell
      label="危险"
      isLink
      @click="
        show({
          title: '危险文本',
          type: 'danger',
          icon: 'CloseCircleOutlined'
        })
      "
    ></ta-cell>
  </ta-group>
  <ta-group title="其他">
    <ta-cell
      label="自定义时长"
      isLink
      @click="show({ title: '5秒后消失', duration: 5000 })"
    ></ta-cell>
    <ta-cell
      label="自定义颜色"
      isLink
      @click="
        show({
          title: '深色调',
          icon: 'InfoCircleOutlined',
          backgroundColor: '#ff4d4f',
          color: '#ffffff'
        })
      "
    ></ta-cell>
    <ta-cell
      label="手动关闭"
      isLink
      @click="show({ title: '常驻可手动关闭', duration: 0, closable: true })"
    ></ta-cell>
  </ta-group>
  <ta-group title="API">
    <ta-cell label="showNotify" isLink @click="callShowApi"></ta-cell>
    <ta-cell label="hideNotify" isLink @click="callHideApi"></ta-cell>
  </ta-group>
  <ta-notify
    v-model:visible="visible"
    :title="title"
    :type="type"
    :backgroundColor="backgroundColor"
    :color="color"
    :icon="icon"
    :duration="duration"
    :closable="closable"
    @cancel="onCancel"
  ></ta-notify>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { showNotify, hideNotify, type StateType, type PopupOnCancel } from '@/index'

interface showArgs {
  icon?: any
  title?: string
  backgroundColor?: string
  color?: string
  type?: StateType
  closable?: boolean
  duration?: number
}

export default defineComponent({
  name: 'ExpNotify',
  setup() {
    const visible = ref(false)
    const title = ref('浅色调')
    const icon = ref('InfoCircleOutlined')
    const backgroundColor = ref('#8bc7ff')
    const color = ref('#292e36')
    const duration = ref(0)
    const type = ref<StateType>('primary')
    const closable = ref(false)

    function callShowApi() {
      showNotify({
        title: '通知文本',
        duration: 5000,
        closable: true,
        success(res) {
          console.log('success', res)
        }
      })
    }

    function callHideApi() {
      hideNotify({
        success(res) {
          console.log('success', res)
        }
      })
    }

    function show(args: showArgs) {
      icon.value = args.icon || null
      title.value = args.title || ''
      backgroundColor.value = args.backgroundColor || ''
      color.value = args.color || ''
      type.value = args.type || 'primary'
      closable.value = args.closable || false
      duration.value = args.duration ?? 1500
      visible.value = true
    }

    const onCancel: PopupOnCancel = res => {
      console.log('cancel', res)
    }

    return {
      visible,
      title,
      icon,
      backgroundColor,
      color,
      duration,
      type,
      closable,

      callShowApi,
      callHideApi,
      show,
      onCancel
    }
  }
})
</script>
