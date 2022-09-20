<template>
  <div class="ak-result" :class="typeClass">
    <div class="ak-result_header">
      <Icon class="ak-result_icon" :class="typeClass" :icon="icon" />
      <div class="ak-result_title" v-if="title">{{ title }}</div>
      <div class="ak-result_description" v-if="description">
        {{ description }}
      </div>
    </div>
    <slot></slot>
    <div class="ak-result_footer">
      <AkButton type="primary" @click="onConfirmClick">
        {{ confirmText || locale.resultConfirmText }}
      </AkButton>
      <AkButton v-if="showBack" type="default" @click="onCancelClick">
        {{ backText || locale.resultBackText }}
      </AkButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import { Button as AkButton } from '../Button'
import { createEnumsValidator, emitEventValidator } from '../helpers/validator'
import { useLocale } from '../ConfigProvider/context'
import type { ResultEmits, ResultType } from './types'
import InfoCircleFilled from '../Icon/icons/InfoCircleFilled'
import WarningFilled from '../Icon/icons/WarningFilled'
import CheckCircleFilled from '../Icon/icons/CheckCircleFilled'
import CloseCircleFilled from '../Icon/icons/CloseCircleFilled'
import type { IconData } from '../Icon/types'
import { getType, getTypeClass, RESULT_TYPES } from './util'
import type { PropsToEmits } from '../helpers/types'

const iconMap = new Map<ResultType, IconData>([
  ['info', InfoCircleFilled],
  ['warning', WarningFilled],
  ['success', CheckCircleFilled],
  ['fail', CloseCircleFilled]
])

export default defineComponent({
  name: 'ak-result',
  components: { Icon, AkButton },
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
    confirm: emitEventValidator,
    back: emitEventValidator
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
