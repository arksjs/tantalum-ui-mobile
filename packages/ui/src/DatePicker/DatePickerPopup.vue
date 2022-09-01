<template>
  <Drawer
    class="fx-picker-popup fx-date-picker-popup"
    placement="bottom"
    :visible="visible"
    @visibleStateChange="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <template #header>
      <NavBar
        class="fx-drawer_header"
        :title="title"
        :leftButtons="[{ text: locale.datePickerCancelText, type: 'primary' }]"
        :rightButtons="[
          { text: locale.datePickerConfirmText, type: 'primary' }
        ]"
        :iconOnly="false"
        @leftButtonClick="onHeaderLeftClick"
        @rightButtonClick="onHeaderRightClick"
      >
      </NavBar>
    </template>
    <PickerView
      ref="viewRef"
      :modelValue="modelValue"
      :formatter="formatter"
      :parser="parser"
    />
  </Drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PickerView } from '../Picker'
import { Drawer } from '../Drawer'
import { NavBar } from '../NavBar'
import { usePopupExtend } from '../popup/use-popup'
import { pickerPopupProps, pickerPopupEmits } from '../Picker/props'
import { usePickerPopup } from '../Picker/use-picker'
import { commonProps } from './props'
import { useHandlers } from '../DatePicker/use-date-picker'
import { useLocale } from '../ConfigProvider/context'
import type { SelectorDetail } from '../SelectorField/types'

export default defineComponent({
  name: 'fx-date-picker-popup',
  components: { PickerView, Drawer, NavBar },
  props: {
    ...pickerPopupProps,
    ...commonProps,
    title: {
      type: String,
      default: ''
    }
  },
  emits: {
    ...pickerPopupEmits
  },
  setup(props, ctx) {
    const { handlers } = useHandlers(props)
    const { locale } = useLocale()
    const popup = usePopupExtend<SelectorDetail>(ctx)
    const pickerPopup = usePickerPopup(props, ctx, popup, { handlers })

    return {
      ...popup,
      ...pickerPopup,
      locale
    }
  }
})
</script>
