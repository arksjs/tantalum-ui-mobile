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
import { PickerPopup } from '../Picker'
import { pickerEmits, pickerProps } from '../Picker/props'
import { usePicker } from '../Picker/use-picker'
import { commonProps } from './props'
import { useHandlers } from '../DatePicker/use-date-picker'
import type { DatePickerEmits } from './types'
import type { PropsToEmits } from '../helpers/types'

export default defineComponent({
  name: 'ta-date-picker',
  components: { SelectorField, PickerPopup },
  props: { ...commonProps, ...pickerProps },
  emits: { ...pickerEmits } as PropsToEmits<DatePickerEmits>,
  setup(props, ctx) {
    const { handlers } = useHandlers(props)

    return {
      ...usePicker(props, ctx, { name: 'picker', handlers })
    }
  }
})
</script>
