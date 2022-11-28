<template>
  <label :class="classes" :style="styles">
    <input
      class="ta-switch_checkbox"
      type="checkbox"
      :disabled="disabled"
      :name="name"
      :value="checked.toString()"
      @change="onChange"
      ref="inputEl"
    />
  </label>
</template>

<script lang="ts">
import { onMounted, ref, watch, defineComponent, computed } from 'vue'
import { formItemProps } from '../Form/form'
import { useInput } from '../Form/use-form'
import { isBoolean, colorValidator, type PropsToEmits } from '../helpers'
import { getClasses, getStyles } from './util'
import type { SwitchEmits } from './types'

export default defineComponent({
  name: 'ta-switch',
  props: {
    ...formItemProps,
    modelValue: {
      type: Boolean,
      default: null // 首次默认为null
    },
    color: {
      type: String,
      validator: colorValidator
    },
    activeColor: {
      type: String,
      validator: colorValidator
    },
    size: {
      type: [Number, String]
    }
  },
  emits: {
    'update:modelValue': value => isBoolean(value),
    change: value => isBoolean(value)
  } as PropsToEmits<SwitchEmits>,
  setup(props, { emit }) {
    let isValueNull = props.modelValue == null
    const checked = ref(false)
    const { inputEl, setInputChecked, getInputChecked } = useInput()

    const classes = computed(() => getClasses(props.disabled))
    const styles = computed(() => getStyles(props))

    function onChange() {
      const value = getInputChecked()

      checked.value = value

      if (props.modelValue !== value) {
        emit('update:modelValue', value)
      }

      emit('change', value)
    }

    onMounted(() => {
      // 同步Mounted之前设置的值到 input 元素
      setInputChecked(checked.value)
    })

    watch(
      () => props.modelValue,
      val => {
        if (isBoolean(val) && val !== checked.value) {
          checked.value = val

          setInputChecked(val)
          // 外面设置进来的，只要符合，不需要调用onChange
        } else if (isValueNull) {
          isValueNull = false
          // 首次外部没有设置值
          emit('update:modelValue', checked.value)
          emit('change', checked.value)
        }
      },
      { immediate: true }
    )

    return {
      inputEl,
      checked,
      onChange,
      classes,
      styles
    }
  }
})
</script>
