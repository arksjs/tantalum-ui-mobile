<template>
  <fx-group title="基础用法">
    <fx-cell label="默认" isLink @click="visible = true"></fx-cell>
    <fx-cell
      label="展示标题"
      isLink
      @click=";(title = '标题'), (visible = true)"
    ></fx-cell>
    <fx-cell
      label="展示取消按钮"
      isLink
      @click=";(showCancel = true), (visible = true)"
    ></fx-cell>
    <fx-cell
      label="设置取消按钮文案"
      isLink
      @click="
        ;(showCancel = true),
          (cancelText = '自定义取消按钮文案'),
          (visible = true)
      "
    ></fx-cell>
  </fx-group>
  <fx-group title="options 扩展">
    <fx-cell
      label="选项描述"
      isLink
      @click="
        ;(options = [
          {
            name: '选项1',
            description: '选项1的描述文案'
          },
          {
            name: '选项2'
          },
          {
            name: '选项3'
          }
        ]),
          (visible = true)
      "
    ></fx-cell>
    <fx-cell
      label="选项高亮"
      isLink
      @click="
        ;(options = [
          {
            name: '选项1',
            highlight: true
          },
          {
            name: '选项2'
          },
          {
            name: '选项3'
          }
        ]),
          (visible = true)
      "
    ></fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell
      label="confirm/cancel"
      isLink
      @click=";(showCancel = true), (showEvent = true), (visible = true)"
    ></fx-cell>
    <fx-cell
      label="visible-state-change"
      isLink
      @click=";(visibleEvent = true), (visible = true)"
    ></fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell label="showActionSheet" isLink @click="onCallApi()"></fx-cell>
  </fx-group>
  <fx-action-sheet
    v-model:visible="visible"
    :title="title"
    :options="options"
    :show-cancel="showCancel"
    :cancel-text="cancelText"
    @confirm="onConfirm"
    @cancel="onCancel"
    @visibleStateChange="onVisibleStateChange"
  ></fx-action-sheet>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  ActionSheetOption,
  ActionSheetOnConfirm,
  showToast,
  showDialog,
  PopupOnCancel,
  showActionSheet,
  PopupOnVisibleStateChange
} from '@/index'

const defaultOptions: ActionSheetOption[] = [
  {
    name: '选项1'
  },
  {
    name: '选项2'
  },
  {
    name: '选项3'
  }
]

export default defineComponent({
  name: 'ExpActionSheet',
  setup() {
    const visible = ref(false)
    const title = ref('')
    const showCancel = ref(false)
    const cancelText = ref('取消')
    const options = ref(defaultOptions)
    const showEvent = ref(false)
    const visibleEvent = ref(false)

    const onVisibleStateChange: PopupOnVisibleStateChange = res => {
      if (visibleEvent.value) {
        console.log('visible-state-change', res)
        showToast(`${res.state} 事件触发`)
      }

      if (res.state === 'hidden') {
        showCancel.value = false
        cancelText.value = '取消'
        options.value = defaultOptions
        title.value = ''
        visibleEvent.value = false
        showEvent.value = false
      }
    }

    const onConfirm: ActionSheetOnConfirm = res => {
      if (showEvent.value) {
        console.log('confirm', res)
        showDialog({
          title: '选择了',
          showCancel: false,
          content: `item.name: '${res.item.name}'\nindex: ${res.index}`
        })
      }
    }

    const onCancel: PopupOnCancel = res => {
      if (showEvent.value) {
        console.log('cancel', res)
        showToast('取消了')
      }
    }

    function onCallApi() {
      showActionSheet({
        title: '标题',
        options: options.value,
        showCancel: true,
        success: res => {
          console.log('success', res)
          const { confirm, detail } = res

          if (confirm) {
            showDialog({
              title: '选择了',
              showCancel: false,
              content: `item.name: '${detail.item.name}'\nindex: ${detail.index}`
            })
          } else {
            showToast('取消了')
          }
        }
      })
    }

    return {
      visible,
      title,
      showCancel,
      cancelText,
      options,
      options2: [
        {
          name: '选项1',
          description: '选项1的描述文案'
        },
        {
          name: '选项2'
        },
        {
          name: '选项3'
        }
      ] as ActionSheetOption[],
      showEvent,
      visibleEvent,

      onVisibleStateChange,
      onConfirm,
      onCancel,
      onCallApi
    }
  }
})
</script>
