<template>
  <PickerView
    class="ak-date-picker-view"
    @update:modelValue="onUpdateValue"
    @change="onChange"
  >
  </PickerView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PickerView } from '../Picker'
import { pickerViewEmits } from '../Picker/props'
import { commonProps } from './props'
import { useHandlers } from '../DatePicker/use-date-picker'
import type { SelectorModelValue } from '../SelectorField/types'

export default defineComponent({
  name: 'ak-date-picker-view',
  components: { PickerView },
  props: {
    ...commonProps
  },
  emits: { ...pickerViewEmits },
  setup(props, ctx) {
    const { emit } = ctx

    useHandlers(props)

    function onChange(e: SelectorModelValue) {
      emit('change', e)
    }

    function onUpdateValue(e: SelectorModelValue) {
      emit('update:modelValue', e)
    }

    return {
      onChange,
      onUpdateValue
    }
  }
})
</script>
