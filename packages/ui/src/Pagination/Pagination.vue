<template>
  <div class="ak-pagination">
    <button
      class="ak-pagination_prev"
      :disabled="pageNum <= 1"
      @click="onClick('prev')"
    >
      <slot name="prev">
        <Icon :icon="LeftOutlined" />
      </slot>
    </button>
    <div class="ak-pagination_content">
      <slot :current="current" :total="totalNum"
        >{{ pageNum }} / {{ totalNum }}</slot
      >
    </div>
    <button
      class="ak-pagination_next"
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
import type { PropsToEmits } from '../helpers/types'
import type { PaginationEmits } from './types'
import LeftOutlined from '../Icon/icons/LeftOutlined'
import RightOutlined from '../Icon/icons/RightOutlined'
import { isNumber, isNumeric, rangeInteger } from '../helpers/util'
import { getTotal } from './util'

export default defineComponent({
  name: 'ak-pagination',
  components: { Icon },
  props: {
    // 栅格占据的列数
    current: {
      type: [Number, String]
    },
    // 栅格左侧的间隔格数
    total: {
      type: [Number, String],
      default: 1
    }
  },
  emits: {
    'update:current': current => isNumber(current),
    change: current => isNumber(current)
  } as PropsToEmits<PaginationEmits>,
  setup(props, { emit }) {
    const pageNum = ref(-1)
    const totalNum = computed(() => getTotal(props.total))

    function change(newPageNum: number) {
      pageNum.value = newPageNum
      emit('update:current', newPageNum)
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
      () => props.current,
      () => {
        if (isNumeric(props.current)) {
          pageNum.value = rangeInteger(props.current, 1, totalNum.value)
        } else if (pageNum.value === -1) {
          change(1)
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