<template>
  <Popover
    class="ak-pop-dialog"
    :visible="visible"
    :selector="selector"
    :placement="placement"
    :showMask="showMask"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div class="ak-pop-dialog_body">
      <div class="ak-popover_text">{{ content }}</div>
    </div>
    <div class="ak-pop-dialog_footer ak-horizontal-hairline">
      <ButtonGroup
        class="ak-pop-dialog_footer-inner"
        pattern="borderless"
        size="middle"
      >
        <Button v-if="showCancel" type="default" @click="onCancelClick">
          {{ cancelText || locale.popDialogCancelText }}
        </Button>
        <Button type="primary" @click="onConfirmClick">
          {{ confirmText || locale.popDialogConfirmText }}
        </Button>
      </ButtonGroup>
    </div>
  </Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { popoverProps, popoverEmits } from '../Popover/props'
import { Button, ButtonGroup } from '../Button'
import { useLocale } from '../ConfigProvider/context'
import { Popover } from '../Popover'
import { usePopupExtend } from '../popup/use-popup'
import type { EmptyObject } from '../helpers/types'

export default defineComponent({
  name: 'ak-pop-dialog',
  components: { Button, ButtonGroup, Popover },
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
  emits: { ...popoverEmits },
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
