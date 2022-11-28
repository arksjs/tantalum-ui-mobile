<template>
  <div class="ta-pagination">
    <button
      class="ta-pagination_prev"
      :disabled="pageNum <= 1"
      @click="onClick('prev')"
    >
      <slot name="prev">
        <Icon :icon="LeftOutlined" />
      </slot>
    </button>
    <div class="ta-pagination_content">
      <slot :current="pageNum" :total="totalNum"
        >{{ pageNum }} / {{ totalNum }}</slot
      >
    </div>
    <button
      class="ta-pagination_next"
      :disabled="pageNum >= totalNum"
      @click="onClick('next')"
    >
      <slot name="next">
        <Icon :icon="RightOutlined" />
      </slot>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { Icon } from '../Icon'
import {
  isNumber,
  isNumeric,
  rangeInteger,
  type PropsToEmits
} from '../helpers'
import type { PaginationEmits } from './types'
import LeftOutlined from '../Icon/icons/LeftOutlined'
import RightOutlined from '../Icon/icons/RightOutlined'
import { getTotal } from './util'

export default defineComponent({
  name: 'ta-pagination',
  components: { Icon },
  props: {
    // 当前页码
    modelValue: {
      type: [Number, String]
    },
    // 总页码
    total: {
      type: [Number, String],
      default: 1
    }
  },
  emits: {
    'update:modelValue': current => isNumber(current),
    change: current => isNumber(current)
  } as PropsToEmits<PaginationEmits>,
  setup(props, { emit }) {
    const pageNum = ref(-1)
    const totalNum = computed(() => getTotal(props.total))

    function change(newPageNum: number) {
      pageNum.value = newPageNum
      emit('update:modelValue', newPageNum)
      emit('change', newPageNum)
    }

    function onClick(type: string) {
      const newPageNum = rangeInteger(
        type === 'next' ? pageNum.value + 1 : pageNum.value - 1,
        1,
        totalNum.value
      )

      change(newPageNum)
    }

    watch(
      () => props.modelValue,
      val => {
        if (isNumeric(val)) {
          pageNum.value = rangeInteger(val, 1, totalNum.value)
        } else if (pageNum.value === -1) {
          pageNum.value = 1
        }
      },
      {
        immediate: true
      }
    )

    return { onClick, LeftOutlined, RightOutlined, pageNum, totalNum }
  }
})
</script>
