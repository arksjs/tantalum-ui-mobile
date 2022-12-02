<template>
  <label class="ta-checkbox" :class="classes" :style="styles">
    <input
      class="ta-checkbox_input ta-form-input"
      type="checkbox"
      :name="name2"
      :value="checkedValue"
      :disabled="disabled2"
      @change="onChange"
      ref="inputEl"
    />
    <div class="ta-checkbox_box">
      <Icon
        class="ta-checkbox_icon"
        :icon="circle ? CircleOutlined : BorderOutlined"
      />
      <Icon
        class="ta-checkbox_checked-icon"
        :icon="circle ? CheckCircleFilled : CheckSquareFilled"
      />
      <span class="ta-checkbox_text" v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '../Icon'
import { checkEmits, checkProps } from './props'
import { useCheck } from './use-check'
import CircleOutlined from '../Icon/icons/CircleOutlined'
import CheckCircleFilled from '../Icon/icons/CheckCircleFilled'
import BorderOutlined from '../Icon/icons/BorderOutlined'
import CheckSquareFilled from '../Icon/icons/CheckSquareFilled'
import type { PropsToEmits } from '../helpers'
import type { CheckboxEmits } from './types'

export default defineComponent({
  name: 'ta-checkbox',
  components: { Icon },
  props: {
    ...checkProps,
    circle: {
      type: Boolean,
      default: false
    }
  },
  emits: { ...checkEmits } as PropsToEmits<CheckboxEmits>,
  setup(props, ctx) {
    return {
      ...useCheck(props, ctx, 'checkbox'),
      CircleOutlined,
      CheckCircleFilled,
      BorderOutlined,
      CheckSquareFilled
    }
  }
})
</script>
