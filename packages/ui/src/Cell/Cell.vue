<template>
  <div :class="classes" @click="onClick">
    <div class="ak-cell_header">
      <div class="ak-cell_icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </div>
      <div class="ak-cell_icon" v-else-if="icon"><Icon :icon="icon" /></div>
      <div class="ak-cell_label" v-if="label">
        {{ label }}
        <span class="ak-cell_required" v-if="required">*</span>
      </div>
      <div class="ak-cell_content">
        <slot>{{ content }}</slot>
      </div>
      <Icon v-if="isLink" :class="arrowClasses" :icon="RightOutlined" />
    </div>
    <div class="ak-cell_body" v-if="description">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import {
  createEnumsValidator,
  emitClickValidator,
  iconValidator
} from '../helpers/validator'
import type { ArrowDirection, CellEmits } from './types'
import RightOutlined from '../Icon/icons/RightOutlined'
import type { IconData } from '../Icon/types'
import { getCellArrowClasses, getCellClasses, LINK_ICON_NAMES } from './util'
import type { OnClick, PropsToEmits } from '../helpers/types'

export default defineComponent({
  name: 'ak-cell',
  components: { Icon },
  props: {
    icon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator
    },
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    clickable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    arrowDirection: {
      type: String as PropType<ArrowDirection>,
      validator: createEnumsValidator(LINK_ICON_NAMES)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    click: emitClickValidator
  } as PropsToEmits<CellEmits>,
  setup(props, { emit }) {
    const onClick: OnClick = e => {
      if (!props.disabled) {
        emit('click', e)
      }
    }

    const classes = computed(() => getCellClasses(props))
    const arrowClasses = computed(() =>
      getCellArrowClasses(props.arrowDirection)
    )

    return {
      classes,
      arrowClasses,
      RightOutlined,
      onClick
    }
  }
})
</script>
