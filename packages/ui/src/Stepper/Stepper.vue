<template>
  <div :class="classes">
    <Button
      :icon="MinusOutlined"
      shape="square"
      size="small"
      :disabled="disabled || disabledMinus || parseFloat(formValue) <= nMin"
      @click="onMinusClick"
    ></Button>
    <input
      class="ak-stepper_input"
      :type="allowDecimal ? 'text' : 'tel'"
      :inputmode="allowDecimal ? 'decimal' : 'numeric'"
      :name="name"
      :disabled="disabled"
      :readonly="disabledInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      ref="inputEl"
    />
    <Button
      :icon="PlusOutlined"
      shape="square"
      size="small"
      :disabled="disabled || disabledPlus || parseFloat(formValue) >= nMax"
      @click="onPlusClick"
    ></Button>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, watch, computed } from 'vue'
import { Button } from '../Button'
import { getNumber } from '../helpers/util'
import { formateNumber, getRangeNumber, getClasses } from './util'
import {
  formStringValueEmits,
  formItemProps,
  formFocusEmits
} from '../Form/form'
import { useInput } from '../Form/use-form'
import PlusOutlined from '../Icon/icons/PlusOutlined'
import MinusOutlined from '../Icon/icons/MinusOutlined'
import type { OnFocus, OnClick, PropsToEmits } from '../helpers/types'
import { emitClickValidator } from '../helpers/validator'
import { StepperEmits } from './types'

export default defineComponent({
  name: 'ak-stepper',
  components: { Button },
  props: {
    ...formItemProps,
    modelValue: {
      type: [Number, String]
    },
    // 是否禁用减少按钮
    disabledMinus: {
      type: Boolean,
      default: false
    },
    // 是否禁用增加按钮
    disabledPlus: {
      type: Boolean,
      default: false
    },
    // 是否禁用输入框
    disabledInput: {
      type: Boolean,
      default: false
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: Infinity
    },
    allowDecimal: {
      type: Boolean,
      default: true
    },
    step: {
      type: [Number, String],
      default: 1
    },
    decimalLength: {
      type: Number
    }
  },
  emits: {
    ...formStringValueEmits,
    ...formFocusEmits,
    plusClick: emitClickValidator,
    minusClick: emitClickValidator
  } as PropsToEmits<StepperEmits>,
  setup(props, { emit }) {
    const formValue = ref('')
    const nMin = computed(() => getNumber(props.min, 1))
    const nMax = computed(() => getNumber(props.max, Infinity))
    const nStep = computed(() => getNumber(props.step, 1))

    const { inputEl, setInputValue, getInputValue } = useInput()

    const classes = computed(() => getClasses(props.disabled))

    function updateValue(val: number | string) {
      const newVal = getRangeNumber(
        {
          min: nMin.value,
          max: nMax.value,
          allowDecimal: props.allowDecimal,
          decimalLength: props.decimalLength
        },
        val
      )

      if (newVal != props.modelValue) {
        emit('update:modelValue', newVal)
      }

      if (newVal !== formValue.value) {
        formValue.value = newVal

        emit('change', newVal)
      }

      setInputValue(newVal)

      return newVal
    }

    const onFocus: OnFocus = e => emit('focus', e)
    const onBlur: OnFocus = e => emit('blur', e)

    function onChange() {
      updateValue(getInputValue())
    }

    function onInput() {
      const val = formateNumber(getInputValue())
      setInputValue(val)

      emit('input', val)
    }

    const onMinusClick: OnClick = e => {
      updateValue(parseFloat(formValue.value) - nStep.value)

      emit('minusClick', e)
    }

    const onPlusClick: OnClick = e => {
      updateValue(parseFloat(formValue.value) + nStep.value)

      emit('plusClick', e)
    }

    onMounted(() => {
      // 同步Mounted之前设置的值到 input 元素
      setInputValue(formValue.value)
    })

    watch(
      () => props.modelValue,
      val => {
        if (
          val != null &&
          parseFloat(val.toString()) !== parseFloat(formValue.value)
        ) {
          updateValue(val)
        } else if (formValue.value === '') {
          // 针对首次没有值的情况，默认最小值
          updateValue(nMin.value)
        }
      },
      {
        immediate: true
      }
    )

    return {
      classes,
      inputEl,
      formValue,
      onFocus,
      onBlur,
      onChange,
      onInput,
      onMinusClick,
      onPlusClick,
      PlusOutlined,
      MinusOutlined,
      nMin,
      nMax
    }
  }
})
</script>
