<template>
  <fx-group title="基础用法">
    <fx-cell label="当前">
      <fx-time-ago :time="time" />
    </fx-cell>
    <fx-cell label="2021-05-01">
      <fx-time-ago :time="time2" />
    </fx-cell>
  </fx-group>
  <fx-group title="间隔">
    <fx-cell label="interval=2">
      <fx-time-ago :time="time" :interval="interval" />
    </fx-cell>
  </fx-group>
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
