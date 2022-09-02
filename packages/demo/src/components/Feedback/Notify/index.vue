<template>
  <ak-group title="基础用法">
    <ak-cell label="主要" isLink @click="show({ title: '通知文本' })"></ak-cell>
    <ak-cell
      label="成功"
      isLink
      @click="show({ title: '成功文本', type: 'success' })"
    ></ak-cell>
    <ak-cell
      label="警告"
      isLink
      @click="show({ title: '警告文本', type: 'warning' })"
    ></ak-cell>
    <ak-cell
      label="危险"
      isLink
      @click="show({ title: '危险文本', type: 'danger' })"
    ></ak-cell>
  </ak-group>
  <ak-group title="自定义图标">
    <ak-cell
      label="成功"
      isLink
      @click="
        show({
          title: '成功文本',
          type: 'success',
          icon: 'CheckCircleOutlined'
        })
      "
    ></ak-cell>
    <ak-cell
      label="警告"
      isLink
      @click="
        show({
          title: '警告文本',
          type: 'warning',
          icon: 'ExclamationCircleOutlined'
        })
      "
    ></ak-cell>
    <ak-cell
      label="危险"
      isLink
      @click="
        show({
          title: '危险文本',
          type: 'danger',
          icon: 'CloseCircleOutlined'
        })
      "
    ></ak-cell>
  </ak-group>
  <ak-group title="其他">
    <ak-cell
      label="自定义时长"
      isLink
      @click="show({ title: '5秒后消失', duration: 5000 })"
    ></ak-cell>
    <ak-cell
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
    ></ak-cell>
    <ak-cell
      label="手动关闭"
      isLink
      @click="show({ title: '常驻可手动关闭', duration: 0, closable: true })"
    ></ak-cell>
  </ak-group>
  <ak-group title="API">
    <ak-cell label="showNotify" isLink @click="callShowApi"></ak-cell>
    <ak-cell label="hideNotify" isLink @click="callHideApi"></ak-cell>
  </ak-group>
  <ak-notify
    v-model:visible="visible"
    :title="title"
    :type="type"
    :backgroundColor="backgroundColor"
    :color="color"
    :icon="icon"
    :duration="duration"
    :closable="closable"
    @cancel="onCancel"
  ></ak-notify>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { showNotify, hideNotify, StateType, PopupOnCancel } from '@/index'

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
