<template>
  <Modal
    class="ak-dialog"
    :visible="visible"
    :showClose="false"
    :maskClosable="maskClosable"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div class="ak-dialog_header" v-if="title">
      {{ title }}
    </div>
    <div class="ak-dialog_content">
      <div class="ak-dialog_content-text" v-if="content">
        {{ content }}
      </div>
      <slot v-else></slot>
    </div>
    <div class="ak-dialog_footer ak-horizontal-hairline">
      <ButtonGroup class="ak-dialog_footer-inner" pattern="borderless">
        <AkButton
          v-if="showCancel"
          class="ak-dialog_button"
          type="default"
          @click="onCancelClick"
        >
          {{ cancelText || locale.dialogCancelText }}
        </AkButton>
        <AkButton
          class="ak-dialog_button"
          type="primary"
          @click="onConfirmClick"
        >
          {{ confirmText || locale.dialogConfirmText }}
        </AkButton>
      </ButtonGroup>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button as AkButton, ButtonGroup } from '../Button'
import { Modal } from '../Modal'
import { usePopupExtend } from '../popup/use-popup'
import { popupEmits, popupExtendProps } from '../popup/popup'
import { useLocale } from '../ConfigProvider/context'
import type { EmptyObject, PropsToEmits } from '../helpers/types'
import type { DialogEmits } from './types'

export default defineComponent({
  name: 'ak-dialog',
  components: { AkButton, ButtonGroup, Modal },
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
