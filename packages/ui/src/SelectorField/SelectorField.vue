<template>
  <div :class="classes" @click="onFieldClick">
    <div :class="inputClasses">
      {{ label || placeholder }}
    </div>
    <Icon class="ta-input_arrow" :icon="RightOutlined" />
    <input
      class="ta-input_cover ta-form-input"
      type="text"
      readonly
      :name="name"
      :disabled="disabled"
      :value="value"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Icon } from '../Icon'
import RightOutlined from '../Icon/icons/RightOutlined'
import { getClasses, getInputClasses } from './util'
import type { PropsToEmits } from '../helpers/types'
import type { SelectorFieldEmits } from './types'
import { returnTrue } from '../helpers/util'

export default defineComponent({
  name: 'ta-selector-field',
  components: { Icon },
  props: {
    disabled: Boolean,
    value: String,
    label: String,
    name: String,
    placeholder: String
  },
  emits: { fieldClick: returnTrue } as PropsToEmits<SelectorFieldEmits>,
  setup(props, { emit }) {
    function onFieldClick() {
      emit('fieldClick')
    }

    const classes = computed(() => getClasses(props))
    const inputClasses = computed(() => getInputClasses(props.label))

    return {
      onFieldClick,
      RightOutlined,
      classes,
      inputClasses
    }
  }
})
</script>
