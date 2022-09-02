<template>
  <ul :class="classes">
    <li v-for="num in paragraphList" :key="num"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useConsumer } from './context'
import { getParagraphClasses, getParagraphRowList } from './util'

export default defineComponent({
  name: 'ak-skeleton-paragraph',
  props: {
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    },
    // 设置段落占位图的行数
    row: {
      type: Number
    }
  },
  setup(props) {
    const parentProps = useConsumer()
    const classes = computed(() => getParagraphClasses(props, parentProps))
    const paragraphList = computed(() =>
      getParagraphRowList(props, parentProps)
    )

    return {
      classes,
      paragraphList
    }
  }
})
</script>
