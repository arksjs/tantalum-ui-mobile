<template>
  <fx-group title="基础用法">
    <fx-cell label="主要" isLink @click="show({ title: '通知文本' })"></fx-cell>
    <fx-cell
      label="成功"
      isLink
      @click="show({ title: '成功文本', type: 'success' })"
    ></fx-cell>
    <fx-cell
      label="警告"
      isLink
      @click="show({ title: '警告文本', type: 'warning' })"
    ></fx-cell>
    <fx-cell
      label="危险"
      isLink
      @click="show({ title: '危险文本', type: 'danger' })"
    ></fx-cell>
  </fx-group>
  <fx-group title="自定义图标">
    <fx-cell
      label="成功"
      isLink
      @click="
        show({
          title: '成功文本',
          type: 'success',
          icon: 'CheckCircleOutlined'
        })
      "
    ></fx-cell>
    <fx-cell
      label="警告"
      isLink
      @click="
        show({
          title: '警告文本',
          type: 'warning',
          icon: 'ExclamationCircleOutlined'
        })
      "
    ></fx-cell>
    <fx-cell
      label="危险"
      isLink
      @click="
        show({
          title: '危险文本',
          type: 'danger',
          icon: 'CloseCircleOutlined'
        })
      "
    ></fx-cell>
  </fx-group>
  <fx-group title="其他">
    <fx-cell
      label="自定义时长"
      isLink
      @click="show({ title: '5秒后消失', duration: 5000 })"
    ></fx-cell>
    <fx-cell
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
    ></fx-cell>
    <fx-cell
      label="手动关闭"
      isLink
      @click="show({ title: '常驻可手动关闭', duration: 0, closable: true })"
    ></fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell label="showNotify" isLink @click="callShowApi"></fx-cell>
    <fx-cell label="hideNotify" isLink @click="callHideApi"></fx-cell>
  </fx-group>
  <fx-notify
    v-model:visible="visible"
    :title="title"
    :type="type"
    :backgroundColor="backgroundColor"
    :color="color"
    :icon="icon"
    :duration="duration"
    :closable="closable"
    @cancel="onCancel"
  ></fx-notify>
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
