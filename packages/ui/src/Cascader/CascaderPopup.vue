<template>
  <Drawer
    class="ta-cascader-popup"
    placement="bottom"
    :visible="visible"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <CascaderView
      ref="viewRef"
      :modelValue="modelValue"
      :options="options"
      :fieldNames="fieldNames"
      :formatter="formatter"
      :parser="parser"
      @select="onHeaderRightClick"
    />
  </Drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Drawer } from '../Drawer'
import CascaderView from './CascaderView.vue'
import { usePopupExtend } from '../popup/use-popup'
import type { CascaderDetail, CascaderPopupEmits } from './types'
import {
  pickerPopupEmits,
  commonProps,
  pickerPopupProps
} from '../Picker/props'
import { usePickerPopup } from '../Picker/use-picker'
import { mergeHandlers } from '../Picker/util'
import type { PropsToEmits } from '../helpers/types'

export default defineComponent({
  name: 'ta-cascader-popup',
  components: { Drawer, CascaderView },
  props: {
    ...pickerPopupProps,
    ...commonProps
  },
  emits: {
    ...pickerPopupEmits
  } as PropsToEmits<CascaderPopupEmits>,
  setup(props, ctx) {
    const popup = usePopupExtend<CascaderDetail>(ctx)
    const pickerPopup = usePickerPopup(props, ctx, popup, {
      handlers: mergeHandlers({
        formatter: props.formatter,
        parser: props.parser
      })
    })

    return {
      ...popup,
      ...pickerPopup
    }
  }
})
</script>
