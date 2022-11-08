<template>
  <div class="ta-time-ago">
    {{ timeAgo }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue'
import { format } from 'timeago.js'
import { useTimer } from '../hooks/use-timer'
import { getDate } from './util'
import { useLocale } from '../ConfigProvider/context'

export default defineComponent({
  name: 'ta-time-ago',
  props: {
    // 倒计时时间
    time: {
      type: [Date, String, Number]
    },
    // 格式化模板
    formatTemplate: {
      type: String
    },
    // 自动更新的间隔，单位：秒
    interval: {
      type: Number,
      default: 60
    }
  },
  setup(props) {
    const timeAgo = ref('')
    const { locale } = useLocale()

    function update() {
      const d = getDate(props)

      timeAgo.value =
        d == null ? '' : format(d, locale.value.lang.replace('-', '_'))
    }

    watch([() => props.time, () => props.formatTemplate], update, {
      immediate: true
    })

    watch(locale, () => update())

    useTimer(update, toRef(props, 'interval'))

    return {
      timeAgo
    }
  }
})
</script>
