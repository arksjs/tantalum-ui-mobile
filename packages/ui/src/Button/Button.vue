<template>
  <button
    :class="classes"
    :disabled="disabled"
    :type="realFormType"
    :style="styles"
  >
    <Icon v-if="loading" :icon="LoadingOutlined" :spin="true" />
    <Icon v-else-if="icon" :icon="icon" />
    <span><slot>button</slot></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import {
  colorValidator,
  createEnumsValidator,
  getEnumsValue,
  iconValidator
} from '../helpers/validator'
import { SIZE_TYPES, STATE_TYPES } from '../helpers/constants'
import type { SizeType, StateType } from '../helpers/types'
import type { FormType, PatternType, ShapeType } from './types'
import LoadingOutlined from '../Icon/icons/LoadingOutlined'
import type { IconData } from '../Icon/types'
import {
  FORM_TYPES,
  getButtonClasses,
  getButtonStyles,
  BUTTON_PATTERN_TYPES,
  BUTTON_SHAPE_TYPES
} from './util'
import { useButtonConsumer } from './context'

export default defineComponent({
  name: 'ta-button',
  components: { Icon },
  props: {
    size: {
      type: String as PropType<SizeType>,
      validator: createEnumsValidator(SIZE_TYPES)
    },
    type: {
      type: String as PropType<StateType>,
      validator: createEnumsValidator(STATE_TYPES)
    },
    pattern: {
      type: String as PropType<PatternType>,
      validator: createEnumsValidator(BUTTON_PATTERN_TYPES)
    },
    shape: {
      type: String as PropType<ShapeType>,
      validator: createEnumsValidator(BUTTON_SHAPE_TYPES)
    },
    formType: {
      type: String as PropType<FormType>,
      validator: createEnumsValidator(FORM_TYPES)
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator
    },
    ghost: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const { groupOptions } = useButtonConsumer()

    const classes = computed(() => getButtonClasses(props, groupOptions))
    const realFormType = computed(() =>
      getEnumsValue(FORM_TYPES, props.formType)
    )
    const styles = computed(() => getButtonStyles(props.color))

    return {
      realFormType,
      classes,
      styles,
      LoadingOutlined
    }
  }
})
</script>
