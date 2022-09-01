<template>
  <Modal
    class="fx-dialog"
    :visible="visible"
    :showClose="false"
    :maskClosable="maskClosable"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div class="fx-dialog_header" v-if="title">
      {{ title }}
    </div>
    <div class="fx-dialog_content">
      <div class="fx-dialog_content-text" v-if="content">
        {{ content }}
      </div>
      <slot v-else></slot>
    </div>
    <div class="fx-dialog_footer fx-horizontal-hairline">
      <ButtonGroup class="fx-dialog_footer-inner" pattern="borderless">
        <Button
          v-if="showCancel"
          class="fx-dialog_button"
          type="default"
          @click="onCancelClick"
        >
          {{ cancelText || locale.dialogCancelText }}
        </Button>
        <Button class="fx-dialog_button" type="primary" @click="onConfirmClick">
          {{ confirmText || locale.dialogConfirmText }}
        </Button>
      </ButtonGroup>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, ButtonGroup } from '../Button'
import { Modal } from '../Modal'
import { usePopupExtend } from '../popup/use-popup'
import { popupEmits, popupExtendProps } from '../popup/popup'
import { useLocale } from '../ConfigProvider/context'
import type { EmptyObject } from '../helpers/types'

export default defineComponent({
  name: 'fx-dialog',
  components: { Button, ButtonGroup, Modal },
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
  emits: { ...popupEmits },
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
