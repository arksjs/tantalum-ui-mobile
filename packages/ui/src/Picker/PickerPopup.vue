<template>
  <Drawer
    class="ta-picker-popup"
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
        :leftButtons="[{ text: locale.pickerCancelText, type: 'primary' }]"
        :rightButtons="[{ text: locale.pickerConfirmText, type: 'primary' }]"
        :iconOnly="false"
        @leftButtonClick="onHeaderLeftClick"
        @rightButtonClick="onHeaderRightClick"
      >
      </NavBar>
    </template>
    <PickerView
      ref="viewRef"
      :modelValue="modelValue"
      :options="options"
      :fieldNames="fieldNames"
      :formatter="formatter"
      :parser="parser"
    />
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import PickerView from './PickerView.vue'
import { Drawer } from '../Drawer'
import { NavBar } from '../NavBar'
import { usePopupExtend } from '../popup/use-popup'
import { pickerPopupProps, pickerPopupEmits, commonProps } from './props'
import { usePickerPopup } from '../Picker/use-picker'
import { useLocale } from '../ConfigProvider/context'
import type { PickerDetail, PickerHandlers, PickerPopupEmits } from './types'
import { mergeHandlers } from './util'
import type { PropsToEmits } from '../helpers'

export default defineComponent({
  name: 'ta-picker-popup',
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
  } as PropsToEmits<PickerPopupEmits>,
  setup(props, ctx) {
    const { locale } = useLocale()
    const handlers = inject<Partial<PickerHandlers>>('taPickerHandlers', {})

    const popup = usePopupExtend<PickerDetail>(ctx)
    const pickerPopup = usePickerPopup(props, ctx, popup, {
      handlers: mergeHandlers(
        {
          formatter: props.formatter,
          parser: props.parser
        },
        handlers
      )
    })

    return {
      ...popup,
      ...pickerPopup,
      locale
    }
  }
})
</script>
