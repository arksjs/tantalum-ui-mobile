<template>
  <Drawer
    class="fx-picker-popup"
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
import type { SelectorDetail } from '../SelectorField/types'
import type { PickerHandlers } from './types'
import { mergeHandlers } from './util'

export default defineComponent({
  name: 'fx-picker-popup',
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
    const { locale } = useLocale()
    const handlers = inject<Partial<PickerHandlers>>('fxPickerHandlers', {})

    const popup = usePopupExtend<SelectorDetail>(ctx)
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
