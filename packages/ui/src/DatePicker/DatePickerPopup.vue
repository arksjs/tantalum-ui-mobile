<template>
  <Drawer
    class="ta-picker-popup ta-date-picker-popup"
    placement="bottom"
    :visible="visible"
    @visibleStateChange="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <template #header>
      <NavBar
        class="ta-drawer_header"
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
import {
  pickerPopupProps,
  pickerPopupEmits,
  isPickerDetail
} from '../Picker/props'
import { usePickerPopup } from '../Picker/use-picker'
import { commonProps } from './props'
import { useHandlers } from '../DatePicker/use-date-picker'
import { useLocale } from '../ConfigProvider/context'
import type { DatePickerDetail, DatePickerPopupEmits } from './types'
import type { PropsToEmits } from '../helpers'

export default defineComponent({
  name: 'ta-date-picker-popup',
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
    ...pickerPopupEmits,
    confirm: payload => isPickerDetail(payload)
  } as PropsToEmits<DatePickerPopupEmits>,
  setup(props, ctx) {
    const { handlers } = useHandlers(props)
    const { locale } = useLocale()
    const popup = usePopupExtend<DatePickerDetail>(ctx)
    const pickerPopup = usePickerPopup(props, ctx, popup, { handlers })

    return {
      ...popup,
      ...pickerPopup,
      locale
    }
  }
})
</script>
