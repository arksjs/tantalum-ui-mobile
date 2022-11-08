<template>
  <ta-group title="基础用法">
    <ta-cell label="当前">
      <ta-time-ago :time="time" />
    </ta-cell>
    <ta-cell label="2021-05-01">
      <ta-time-ago :time="time2" />
    </ta-cell>
  </ta-group>
  <ta-group title="间隔">
    <ta-cell label="interval=2">
      <ta-time-ago :time="time" :interval="interval" />
    </ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'ExpTimeAgo',
  data() {
    return {
      time: new Date(),
      time2: dayjs('2021-05-01', 'YYYY-MM-DD').toDate(),
      interval: 2
    }
  }
})
</script>
