<template>
  <label class="ak-radio" :class="classes" :style="styles">
    <input
      class="ak-radio_input ak-form-input"
      type="radio"
      :name="name2"
      :value="value"
      :disabled="disabled2"
      @change="onChange"
      ref="input"
    />
    <div class="ak-radio_box">
      <Icon class="ak-radio_icon" :icon="CircleOutlined" />
      <Icon class="ak-radio_checked-icon" :icon="CheckCircleFilled" />
      <span class="ak-radio_text" v-if="$slots.default">
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

export default defineComponent({
  name: 'ak-radio',
  components: { Icon },
  props: {
    ...checkProps
  },
  emits: { ...checkEmits },
  setup(props, ctx) {
    return {
      ...useCheck(props, ctx, 'radio'),
      CircleOutlined,
      CheckCircleFilled
    }
  }
})
</script>
