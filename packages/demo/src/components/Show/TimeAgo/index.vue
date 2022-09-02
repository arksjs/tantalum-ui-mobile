<template>
  <ak-group title="基础用法">
    <ak-cell label="当前">
      <ak-time-ago :time="time" />
    </ak-cell>
    <ak-cell label="2021-05-01">
      <ak-time-ago :time="time2" />
    </ak-cell>
  </ak-group>
  <ak-group title="间隔">
    <ak-cell label="interval=2">
      <ak-time-ago :time="time" :interval="interval" />
    </ak-cell>
  </ak-group>
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
