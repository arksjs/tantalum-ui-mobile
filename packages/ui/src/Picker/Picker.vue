<template>
  <div class="ta-picker" :class="{ disabled }" ref="root">
    <SelectorField
      :label="fieldLabel"
      :value="fieldValue"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      @fieldClick="onFieldClick"
    />
    <PickerPopup
      :options="options"
      :fieldNames="fieldNames"
      :modelValue="modelValue"
      :title="placeholder"
      :formatter="formatter"
      :parser="parser"
      v-model:visible="popupVisible"
      v-if="isInitPopup"
      @confirm="onConfirm"
      ref="popupRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SelectorField } from '../SelectorField'
import PickerPopup from './PickerPopup.vue'
import { pickerEmits, pickerProps, commonProps } from './props'
import { mergeHandlers } from './util'
import { usePicker } from './use-picker'
import type { PropsToEmits } from '../helpers/types'
import type { PickerEmits } from './types'

export default defineComponent({
  name: 'ta-picker',
  components: { SelectorField, PickerPopup },
  props: { ...commonProps, ...pickerProps },
  emits: { ...pickerEmits } as PropsToEmits<PickerEmits>,
  setup(props, ctx) {
    return {
      ...usePicker(props, ctx, {
        name: 'picker',
        handlers: mergeHandlers({
          formatter: props.formatter,
          parser: props.parser
        })
      })
    }
  }
})
</script>
