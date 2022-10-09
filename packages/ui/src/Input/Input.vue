<template>
  <label :class="classes">
    <div class="ak-input_prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <textarea
      v-if="type === 'textarea'"
      class="ak-input_input ak-input_textarea"
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxLength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      ref="inputEl"
    ></textarea>
    <input
      v-else
      class="ak-input_input"
      :name="name"
      :type="typeMode.inputType"
      :inputmode="typeMode.inputMode"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxLength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      ref="inputEl"
    />
    <span class="ak-input_limit" v-if="showLimit && maxLength > 0"
      >{{ inputValue.length }}/{{ maxLength }}</span
    >
    <Icon
      v-if="showClear && isShowClear"
      class="ak-input_clear"
      :icon="CloseCircleFilled"
      @mousedown.prevent="onClear"
    />
    <div class="ak-input_append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { Icon } from '../Icon'
import { isNumeric, isStringNumberMix } from '../helpers/util'
import { getClasses, getInputMode, getMaxLength, getValue } from './util'
import {
  formFocusEmits,
  formItemProps,
  formStringValueEmits
} from '../Form/form'
import { useInput } from '../Form/use-form'
import CloseCircleFilled from '../Icon/icons/CloseCircleFilled'
import type { OnFocus, PropsToEmits } from '../helpers/types'
import type { InputEmits } from './types'

export default defineComponent({
  name: 'ak-input',
  components: { Icon },
  props: {
    ...formItemProps,
    maxlength: {
      type: [Number, String],
      validator: (val: number | string) => isNumeric(val),
      default: 140
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: [Number, String],
      validator: (val: number | string) => isStringNumberMix(val)
    },
    focus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showClear: {
      type: Boolean,
      default: false
    },
    // 展示字数限制文本
    showLimit: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    ...formStringValueEmits,
    ...formFocusEmits
  } as PropsToEmits<InputEmits>,
  setup(props, { emit, slots }) {
    const active = ref(false)
    const isShowClear = ref(false)
    const inputValue = ref('')

    const { inputEl, setFocus, setBlur, getInputValue, setInputValue } =
      useInput()

    function updateValue(val: string | number) {
      const newVal = getValue(val, props.type)

      let isChange = false

      if (newVal !== getInputValue()) {
        setInputValue(newVal)
      }

      if (newVal !== inputValue.value) {
        inputValue.value = newVal
        isChange = true
      }

      if (newVal != props.modelValue) {
        emit('update:modelValue', newVal)
      }

      return { value: newVal, isChange }
    }

    function updateInput(newVal: string) {
      const { value, isChange } = updateValue(newVal)

      isChange && emit('input', value)
    }

    let isComposition = false

    function onCompositionStart() {
      isComposition = true
    }

    function onCompositionEnd() {
      isComposition = false
      updateInput(getInputValue())
    }

    const onFocus: OnFocus = e => {
      active.value = true
      emit('focus', e)
    }
    const onBlur: OnFocus = e => {
      active.value = false
      emit('blur', e)
    }

    function onInput() {
      if (!isComposition) {
        updateInput(getInputValue())
      }
    }

    function onChange() {
      emit('change', inputValue.value)
    }

    function onClear() {
      updateInput('')
      emit('change', inputValue.value)
    }

    const typeMode = computed(() => getInputMode(props.type))
    const classes = computed(() =>
      getClasses({
        type: props.type,
        prepend: !!slots.prepend,
        append: !!slots.append,
        active: active.value,
        disabled: props.disabled,
        readonly: props.readonly
      })
    )

    watch(
      () => props.modelValue,
      val => {
        val != inputValue.value && updateValue(val ?? '')
      }
    )

    watch(
      () => props.focus,
      val => {
        val ? setFocus() : setBlur()
      }
    )

    const maxLength = computed(() => getMaxLength(props.maxlength))

    let timer: number
    watch([inputValue, active], ([ipVal, isActive]) => {
      clearTimeout(timer)
      if (ipVal && isActive) {
        timer = window.setTimeout(() => (isShowClear.value = true), 200)
      } else {
        isShowClear.value = false
      }
    })

    onMounted(() => {
      updateValue(props.modelValue ?? '')

      props.focus && setFocus()
    })

    return {
      classes,
      inputEl,
      inputValue,
      active,
      onCompositionStart,
      onCompositionEnd,
      onFocus,
      onBlur,
      onInput,
      onChange,
      onClear,
      typeMode,
      maxLength,
      isShowClear,
      CloseCircleFilled
    }
  }
})
</script>
