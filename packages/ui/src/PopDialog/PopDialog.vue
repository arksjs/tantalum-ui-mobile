<template>
  <Popover
    class="ta-pop-dialog"
    :visible="visible"
    :selector="selector"
    :placement="placement"
    :showMask="showMask"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <div class="ta-pop-dialog_body">
      <div class="ta-popover_text">{{ content }}</div>
    </div>
    <div class="ta-pop-dialog_footer ta-horizontal-hairline">
      <ButtonGroup
        class="ta-pop-dialog_footer-inner"
        pattern="borderless"
        size="middle"
      >
        <TaButton v-if="showCancel" type="default" @click="onCancelClick">
          {{ cancelText || locale.popDialogCancelText }}
        </TaButton>
        <TaButton type="primary" @click="onConfirmClick">
          {{ confirmText || locale.popDialogConfirmText }}
        </TaButton>
      </ButtonGroup>
    </div>
  </Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { popoverProps, popoverEmits } from '../Popover/props'
import { Button as TaButton, ButtonGroup } from '../Button'
import { useLocale } from '../ConfigProvider/context'
import { Popover } from '../Popover'
import { usePopupExtend } from '../popup/use-popup'
import type { EmptyObject, PropsToEmits } from '../helpers'
import type { PopDialogEmits } from './types'

export default defineComponent({
  name: 'ta-pop-dialog',
  components: { TaButton, ButtonGroup, Popover },
  props: {
    ...popoverProps,
    content: {
      type: String,
      default: '',
      required: true
    },
    // 展示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },
    // 取消文本
    cancelText: {
      type: String
    },
    // 确认文本
    confirmText: {
      type: String
    }
  },
  emits: { ...popoverEmits } as PropsToEmits<PopDialogEmits>,
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
