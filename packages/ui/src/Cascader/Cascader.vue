<template>
  <div class="ak-cascader" :class="{ disabled }" ref="root">
    <SelectorField
      :label="fieldLabel"
      :value="fieldValue"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      @fieldClick="onFieldClick"
    />
    <CascaderPopup
      :options="options"
      :fieldNames="fieldNames"
      :modelValue="modelValue"
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
import CascaderPopup from './CascaderPopup.vue'
import { SelectorField } from '../SelectorField'
import { pickerEmits, pickerProps, commonProps } from '../Picker/props'
import { mergeHandlers } from '../Picker/util'
import { usePicker } from '../Picker/use-picker'
import type { PropsToEmits } from '../helpers/types'
import type { CascaderEmits } from './types'

export default defineComponent({
  name: 'ak-cascader',
  components: { CascaderPopup, SelectorField },
  props: { ...commonProps, ...pickerProps },
  emits: { ...pickerEmits } as PropsToEmits<CascaderEmits>,
  setup(props, ctx) {
    return {
      ...usePicker(props, ctx, {
        name: 'cascader',
        handlers: mergeHandlers({
          formatter: props.formatter,
          parser: props.parser
        })
      })
    }
  }
})
</script>
