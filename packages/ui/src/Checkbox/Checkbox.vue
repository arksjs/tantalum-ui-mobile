<template>
  <label class="fx-checkbox" :class="classes" :style="styles">
    <input
      class="fx-checkbox_input fx-form-input"
      type="checkbox"
      :name="name2"
      :value="value"
      :disabled="disabled2"
      @change="onChange"
      ref="input"
    />
    <div class="fx-checkbox_box">
      <Icon
        class="fx-checkbox_icon"
        :icon="circle ? CircleOutlined : BorderOutlined"
      />
      <Icon
        class="fx-checkbox_checked-icon"
        :icon="circle ? CheckCircleFilled : CheckSquareFilled"
      />
      <span class="fx-checkbox_text" v-if="$slots.default">
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

export default defineComponent({
  name: 'fx-checkbox',
  components: { Icon },
  props: {
    ...checkProps,
    circle: {
      type: Boolean,
      default: false
    }
  },
  emits: { ...checkEmits },
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
