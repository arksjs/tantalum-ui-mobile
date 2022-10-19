<template>
  <div class="ak-copy" @click="onCopy">
    <input type="text" :value="text" class="ak-copy_input" ref="inputEl" />
    <div class="ak-copy_box">
      <slot>{{ locale.copyText }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import Exception from '../helpers/exception'
import { defineComponent, shallowRef } from 'vue'
import { useLocale } from '../ConfigProvider/context'
import { copy } from './util'
import type { PropsToEmits } from '../helpers/types'
import type { CopyEmits } from './types'
import { isString } from '../helpers/util'

export default defineComponent({
  name: 'ak-copy',
  props: {
    // 需要复制的文本
    text: {
      type: String,
      required: true,
      default: ''
    }
  },
  emits: {
    success: payload => isString(payload),
    error: e => e instanceof Error
  } as PropsToEmits<CopyEmits>,
  setup(props, { emit }) {
    const { locale } = useLocale()
    const inputEl = shallowRef<HTMLInputElement | null>(null)

    function onCopy() {
      try {
        const $el = inputEl.value as HTMLInputElement

        copy($el)

        emit('success', $el.value ?? '')
      } catch (error) {
        emit('error', new Exception(error))
      }
    }

    return {
      inputEl,
      onCopy,
      locale
    }
  }
})
</script>
