<template>
  <div class="fx-picker" :class="{ disabled }" ref="root">
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
      ref="popup"
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

export default defineComponent({
  name: 'fx-picker',
  components: { SelectorField, PickerPopup },
  props: { ...commonProps, ...pickerProps },
  emits: { ...pickerEmits },
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
