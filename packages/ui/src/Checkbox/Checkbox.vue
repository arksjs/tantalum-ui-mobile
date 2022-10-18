<template>
  <label class="ak-checkbox" :class="classes" :style="styles">
    <input
      class="ak-checkbox_input ak-form-input"
      type="checkbox"
      :name="name2"
      :value="checkedValue"
      :disabled="disabled2"
      @change="onChange"
      ref="inputEl"
    />
    <div class="ak-checkbox_box">
      <Icon
        class="ak-checkbox_icon"
        :icon="circle ? CircleOutlined : BorderOutlined"
      />
      <Icon
        class="ak-checkbox_checked-icon"
        :icon="circle ? CheckCircleFilled : CheckSquareFilled"
      />
      <span class="ak-checkbox_text" v-if="$slots.default">
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
import type { PropsToEmits } from '../helpers/types'
import type { CheckboxEmits } from './types'

export default defineComponent({
  name: 'ak-checkbox',
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
