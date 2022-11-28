<template>
  <Modal
    class="ta-dialog"
    :visible="visible"
    :showClose="false"
    :maskClosable="maskClosable"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <div class="ta-dialog_header" v-if="title">
      {{ title }}
    </div>
    <div class="ta-dialog_content">
      <div class="ta-dialog_content-text" v-if="content">
        {{ content }}
      </div>
      <slot v-else></slot>
    </div>
    <div class="ta-dialog_footer ta-horizontal-hairline">
      <ButtonGroup class="ta-dialog_footer-inner" pattern="borderless">
        <TaButton
          v-if="showCancel"
          class="ta-dialog_button"
          type="default"
          @click="onCancelClick"
        >
          {{ cancelText || locale.dialogCancelText }}
        </TaButton>
        <TaButton
          class="ta-dialog_button"
          type="primary"
          @click="onConfirmClick"
        >
          {{ confirmText || locale.dialogConfirmText }}
        </TaButton>
      </ButtonGroup>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button as TaButton, ButtonGroup } from '../Button'
import { Modal } from '../Modal'
import { usePopupExtend } from '../popup/use-popup'
import { popupEmits, popupExtendProps } from '../popup/popup'
import { useLocale } from '../ConfigProvider/context'
import type { EmptyObject, PropsToEmits } from '../helpers'
import type { DialogEmits } from './types'

export default defineComponent({
  name: 'ta-dialog',
  components: { TaButton, ButtonGroup, Modal },
  props: {
    ...popupExtendProps,
    title: {
      type: String,
      default: null
    },
    cancelText: {
      type: String
    },
    confirmText: {
      type: String
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: null
    }
  },
  emits: { ...popupEmits } as PropsToEmits<DialogEmits>,
  setup(props, ctx) {
    const { locale } = useLocale()
    const popup = usePopupExtend<EmptyObject>(ctx)

    function onConfirmClick() {
      popup.customConfirm({})
    }

    return {
      ...popup,
      onConfirmClick,
      locale
    }
  }
})
</script>
