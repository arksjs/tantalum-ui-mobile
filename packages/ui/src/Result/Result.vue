<template>
  <div class="ta-result" :class="typeClass">
    <div class="ta-result_header">
      <Icon class="ta-result_icon" :class="typeClass" :icon="icon" />
      <div class="ta-result_title" v-if="title">{{ title }}</div>
      <div class="ta-result_description" v-if="description">
        {{ description }}
      </div>
    </div>
    <slot></slot>
    <div class="ta-result_footer">
      <TaButton type="primary" size="large" @click="onConfirmClick">
        {{ confirmText || locale.resultConfirmText }}
      </TaButton>
      <TaButton
        v-if="showBack"
        type="default"
        size="large"
        @click="onCancelClick"
      >
        {{ backText || locale.resultBackText }}
      </TaButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { Icon } from '../Icon'
import { Button as TaButton } from '../Button'
import {
  createEnumsValidator,
  emitClickValidator,
  type PropsToEmits
} from '../helpers'
import { useLocale } from '../ConfigProvider/context'
import type { ResultEmits, ResultType } from './types'
import InfoCircleFilled from '../Icon/icons/InfoCircleFilled'
import WarningFilled from '../Icon/icons/WarningFilled'
import CheckCircleFilled from '../Icon/icons/CheckCircleFilled'
import CloseCircleFilled from '../Icon/icons/CloseCircleFilled'
import type { IconData } from '../Icon/types'
import { getType, getTypeClass, RESULT_TYPES } from './util'

const iconMap = new Map<ResultType, IconData>([
  ['info', InfoCircleFilled],
  ['warning', WarningFilled],
  ['success', CheckCircleFilled],
  ['fail', CloseCircleFilled]
])

export default defineComponent({
  name: 'ta-result',
  components: { Icon, TaButton },
  props: {
    // 类型
    type: {
      type: String as PropType<ResultType>,
      validator: createEnumsValidator(RESULT_TYPES)
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 描述
    description: {
      type: String,
      default: ''
    },
    // 展示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    // 返回文本文本
    backText: {
      type: String
    },
    // 确认文本
    confirmText: {
      type: String
    }
  },
  emits: {
    confirm: emitClickValidator,
    back: emitClickValidator
  } as PropsToEmits<ResultEmits>,
  setup(props, { emit }) {
    const { locale } = useLocale()
    const typeClass = computed(() => getTypeClass(props.type))
    const icon = computed(() => iconMap.get(getType(props.type)) as IconData)

    function onConfirmClick(e: MouseEvent) {
      emit('confirm', e)
    }

    function onCancelClick(e: MouseEvent) {
      emit('back', e)
    }

    return {
      typeClass,
      icon,
      onConfirmClick,
      onCancelClick,
      locale
    }
  }
})
</script>
