<template>
  <label class="ta-radio" :class="classes" :style="styles">
    <input
      class="ta-radio_input ta-form-input"
      type="radio"
      :name="name2"
      :value="checkedValue"
      :disabled="disabled2"
      @change="onChange"
      ref="inputEl"
    />
    <div class="ta-radio_box">
      <Icon class="ta-radio_icon" :icon="CircleOutlined" />
      <Icon class="ta-radio_checked-icon" :icon="CheckCircleFilled" />
      <span class="ta-radio_text" v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '../Icon'
import { checkEmits, checkProps } from '../Checkbox/props'
import { useCheck } from '../Checkbox/use-check'
import CircleOutlined from '../Icon/icons/CircleOutlined'
import CheckCircleFilled from '../Icon/icons/CheckCircleFilled'
import type { PropsToEmits } from '../helpers'
import type { RadioEmits } from './types'

export default defineComponent({
  name: 'ta-radio',
  components: { Icon },
  props: {
    ...checkProps
  },
  emits: { ...checkEmits } as PropsToEmits<RadioEmits>,
  setup(props, ctx) {
    return {
      ...useCheck(props, ctx, 'radio'),
      CircleOutlined,
      CheckCircleFilled
    }
  }
})
</script>
