<template>
  <div class="fx-calendar-view_month-caption">
    {{ month.caption }}
  </div>
  <div
    class="fx-calendar-view_days"
    :data-index="monthIndex"
    @click="onDaysClick"
  >
    <div
      class="fx-calendar-view_day"
      :class="{
        disabled: day.state === 'disabled',
        selected:
          day.state === 'selected' ||
          day.state === 'startSelected' ||
          day.state === 'endSelected',
        'in-range': mode === 'range' && day.state === 'selected'
      }"
      v-for="(day, dayIndex) in month.days"
      :key="dayIndex"
      :data-index="dayIndex"
    >
      <span
        v-if="day.topText"
        class="fx-calendar-view_day-top-text"
        :class="{ highlight: day.topHighlight }"
        >{{ day.topText }}</span
      >
      {{ day.text }}
      <span
        v-if="day.bottomText"
        class="fx-calendar-view_day-bottom-text"
        :class="{ highlight: day.bottomHighlight }"
        >{{ day.bottomText }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { OnClick } from '../helpers/types'
import type { Mode, Month } from './types'

export default defineComponent({
  name: 'fx-calendar-view-month',
  props: {
    month: {
      type: Object as PropType<Month>,
      required: true
    },
    monthIndex: {
      type: Number,
      required: true
    },
    onDaysClick: {
      type: Function as PropType<OnClick>,
      required: true
    },
    mode: {
      type: String as PropType<Mode>,
      required: true
    }
  }
})
</script>
