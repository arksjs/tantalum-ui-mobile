<template>
  <div class="fx-calendar-view">
    <div class="fx-calendar-view_header">
      <div class="fx-calendar-view_weekdays">
        <span
          class="fx-calendar-view_weekday"
          :class="{ highlight: weekDay === '0' || weekDay === '6' }"
          v-for="weekDay in weekDays"
          :key="weekDay"
          >{{ locale.calendarWeekDayTexts[weekDay] }}
        </span>
      </div>
    </div>
    <div class="fx-calendar-view_body" ref="bodyEl">
      <VirtualList
        :ids="months.map(v => v.caption)"
        :itemSize="getItemSize"
        @scroll="onScroll"
      >
        <template #default="{ index }">
          <ViewMonth
            :month="months[index]"
            :monthIndex="index"
            :mode="mode"
            :onDaysClick="onDaysClick"
          />
        </template>
      </VirtualList>
      <div class="fx-calendar-view_month-caption fixed" ref="bodyTitleEl"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import dayjs from '../helpers/day'
import type { Dayjs, PropsToEmits } from '../helpers/types'
import { isSameArray } from '../helpers/util'
import { showToast } from '../Toast'
import { commonProps, calendarDetailValidator } from './props'
import {
  printError,
  getMinTime,
  getMaxTime,
  getTimeByDate,
  getFirstDayOfWeek,
  getViewBodyTitleStyles
} from './util'
import type { CalendarViewEmits, DayInfo, Month } from './types'
import { useHandlers } from '../Calendar/use-calendar'
import { pickerViewEmits } from '../Picker/props'
import { useLocale } from '../ConfigProvider/context'
import ViewMonth from './CalendarViewMonth.vue'
import { VirtualList } from '../VirtualList'
import { CSSProperties2CssText, getScrollTop } from '../helpers/dom'

type WeekDay = '0' | '1' | '2' | '3' | '4' | '5' | '6'

interface SelectDay {
  dateString: string
  timestamp: number
  monthIndex: number
  dayIndex: number
  state?: string
}

const defaultWeekDays: WeekDay[] = ['0', '1', '2', '3', '4', '5', '6']

function getDefaultSelectDay() {
  return {
    dateString: '',
    timestamp: 0,
    monthIndex: 0,
    dayIndex: 0
  }
}

export default defineComponent({
  name: 'fx-calendar-view',
  components: { ViewMonth, VirtualList },
  props: { ...commonProps },
  emits: {
    ...pickerViewEmits,
    select: calendarDetailValidator
  } as PropsToEmits<CalendarViewEmits>,
  setup(props, { emit }) {
    const { locale } = useLocale()
    const { formatter, parser, mode } = useHandlers(props)
    const bodyEl = ref<HTMLDivElement>()
    const bodyTitleEl = ref<HTMLDivElement>()

    const weekDays = ref<WeekDay[]>([])
    const months = reactive<Month[]>([])

    let start: SelectDay = getDefaultSelectDay()
    let end: SelectDay = getDefaultSelectDay()

    function getSelectedInfo(timestamp: number): SelectDay | null {
      for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < months[i].days.length; j++) {
          const day = months[i].days[j]

          if (day.state !== 'disabled') {
            if (timestamp === day.timestamp) {
              return {
                dateString: day.dateString,
                timestamp,
                monthIndex: i,
                dayIndex: j
              }
            }
          }
        }
      }

      return null
    }

    function updateValue(val: unknown) {
      return updateOriginalValue(parser(val))
    }

    function updateOriginalValue(timeArr: number[]) {
      if (timeArr.length === 1) {
        timeArr.push(0)
      }

      if (!isSameArray(timeArr, [start.timestamp, end.timestamp])) {
        if (timeArr.length === 0 || timeArr[0] === 0) {
          setSelected('start', null)
          setSelected('end', null)
          updateStates()
        } else if (mode === 'range') {
          const _start = getSelectedInfo(timeArr[0])
          const _end = getSelectedInfo(timeArr[1])

          if (_start && _end) {
            const { rangeCount, hasDisabled } = getRangeInfo(_start, _end)

            if (hasDisabled) {
              printError('The range of "modelValue" contains disabled days.')
            } else if (rangeCount > props.maxRange) {
              printError(
                `The range of "modelValue" contains ${rangeCount} days, no more than ${props.maxRange} days.`
              )
            } else {
              setSelected('start', _start)
              setSelected('end', _end)
              updateStates()
            }
          } else {
            printError(
              'The range of "modelValue" is not in the optional range.'
            )
          }
        } else {
          const select = getSelectedInfo(timeArr[0])

          if (select) {
            start = select
            setSelected('end', null)
            updateStates()
          } else {
            printError(
              'The range of "modelValue" is not in the optional range.'
            )
          }
        }
      }

      return getDetail()
    }

    function setSelected(name: 'start' | 'end', day: SelectDay | null) {
      if (day) {
        name === 'start' ? (start = day) : (end = day)
      } else {
        name === 'start'
          ? (start = getDefaultSelectDay())
          : (end = getDefaultSelectDay())
      }
    }

    function getState(timestamp: number) {
      let state = ''

      if (
        (mode === 'range' &&
          timestamp >= start.timestamp &&
          timestamp <= end.timestamp) ||
        timestamp === start.timestamp
      ) {
        state = 'selected'
      }
      if (mode === 'range' && state == 'selected') {
        if (timestamp === end.timestamp) {
          state = 'endSelected'
        } else if (timestamp === start.timestamp) {
          state = 'startSelected'
        }
      }

      return state
    }

    function getDayInfo(day: Dayjs, extend: { state: string }): DayInfo {
      const dateString = day.format('YYYY-MM-DD')
      const state = extend.state

      let dayInfo: DayInfo = {
        topHighlight: false,
        topText:
          state === 'startSelected'
            ? locale.value.calendarSelectedStartText
            : state === 'endSelected'
            ? locale.value.calendarSelectedEndText
            : '',
        state,
        bottomHighlight: false,
        bottomText: '',
        text: day.date().toString(),
        dateString,
        timestamp: day.valueOf()
      }

      if (props.dayHandler) {
        dayInfo.date = day.toDate()
        dayInfo = props.dayHandler(Object.assign(dayInfo, extend))
        delete dayInfo.date
      }

      if (dayInfo.state === 'disabled' && !extend.state) {
        extend.state = 'disabled'
      }

      return Object.assign(dayInfo, extend, {
        dateString,
        timestamp: day.valueOf()
      })
    }

    function getStartMonth(day: Dayjs) {
      const month: Month = {
        caption: day.format(locale.value.calendarMonthCaption),
        monthString: day.format('YYYY-MM'),
        days: [],
        startDay: day.date()
      }

      let day2 = day.startOf('month')

      // 头部周偏移占位
      for (
        let i = 0, len = day2.day() - getFirstDayOfWeek(props.firstDayOfWeek);
        i < len;
        i++
      ) {
        month.days.push({
          cover: true,
          text: '',
          state: 'disabled',
          dateString: '',
          timestamp: 0
        })
      }

      while (day2.date() < month.startDay) {
        month.days.push(getDayInfo(day2, { state: 'disabled' }))
        day2 = day2.add(1, 'day')
      }

      return month
    }

    function updateWeekDays() {
      let i = getFirstDayOfWeek()
      const newWeekDays: WeekDay[] = []

      let weekDay: WeekDay
      while (newWeekDays.length < 7) {
        weekDay = defaultWeekDays[i]
        newWeekDays.push(weekDay)
        i = (i + 1) % 7
      }

      weekDays.value = newWeekDays
    }

    let minTimestamp = 0
    let maxTimestamp = 0

    function updateOptions() {
      if (props.minDate instanceof Date) {
        minTimestamp = getTimeByDate(props.minDate)
      } else {
        minTimestamp = getMinTime()
      }

      if (props.maxDate instanceof Date) {
        if (props.maxDate.getTime() < minTimestamp) {
          printError(
            'The value of "maxDate" cannot be less than the value of "minDate".'
          )
          maxTimestamp = getMaxTime(minTimestamp)
        } else {
          maxTimestamp = getTimeByDate(props.maxDate)
        }
      } else {
        maxTimestamp = getMaxTime(minTimestamp)
      }

      updateWeekDays()

      const maxDay = dayjs(maxTimestamp)
      const _months = []

      let day = dayjs(minTimestamp)
      let monthKey = day.month()
      let month = getStartMonth(day)

      while (!day.isAfter(maxDay)) {
        if (day.month() !== monthKey) {
          monthKey = day.month()
          _months.push(month)
          month = getStartMonth(day)
        }

        const dayInfo = getDayInfo(day, {
          state: getState(day.valueOf())
        })

        // if (
        //   dayInfo.state === 'startSelected' ||
        //   (mode === 'single' && dayInfo.state === 'selected')
        // ) {
        //   setSelected('start', dayInfo, _months.length, month.days.length)
        // } else if (dayInfo.state === 'endSelected') {
        //   setSelected('end', dayInfo, _months.length, month.days.length)
        // }

        month.days.push(dayInfo)
        day = day.add(1, 'day')
      }

      // 补上最后一个月结尾的天数
      while (day.month() === monthKey) {
        month.days.push(
          getDayInfo(day, {
            state: 'disabled'
          })
        )

        day = day.add(1, 'day')
      }

      _months.push(month)

      months.splice(0, Infinity, ..._months)

      updateBodyFixed(bodyScrollTop)
    }

    function dayInfo2SelectDay(
      day: DayInfo,
      monthIndex: number,
      dayIndex: number
    ): SelectDay {
      return {
        dateString: day.dateString,
        timestamp: day.timestamp,
        state: day.state,
        monthIndex,
        dayIndex
      }
    }

    function onDaysClick(e: Event) {
      const target = e.target as HTMLElement
      let $day: HTMLElement | null = null

      if (target.tagName === 'SPAN') {
        $day = target.parentElement as HTMLElement
      } else if (target !== e.currentTarget) {
        $day = target
      }

      if (!$day) {
        return
      }

      const monthIndex = parseInt(
        (e.currentTarget as HTMLElement).dataset.index as string
      )
      const dayIndex = parseInt($day.dataset.index as string)
      const day = months[monthIndex].days[dayIndex]

      if (day.state === 'disabled') {
        return
      }

      const newDay = dayInfo2SelectDay(day, monthIndex, dayIndex)

      if (mode === 'range') {
        // 范围
        if ((start.dateString && end.dateString) || !start.dateString) {
          setSelected('end', null)
        } else {
          if (
            day.timestamp > start.timestamp ||
            (props.allowSameDay && day.timestamp === start.timestamp)
          ) {
            // 范围
            const { rangeCount, hasDisabled } = getRangeInfo(start, {
              monthIndex,
              dayIndex
            })

            if (!hasDisabled) {
              if (rangeCount > props.maxRange) {
                showToast(
                  locale.value.calendarMaxRangeTips.replace(
                    '{{maxRange}}',
                    props.maxRange.toString()
                  )
                )
              } else {
                setSelected('end', newDay)
                updateStates()
                onSelect()
              }
              return
            }
          }
        }
      } else {
        // 单选
        setSelected('start', newDay)
        updateStates()
        onSelect()
        return
      }

      // range 设置开始时间
      setSelected('start', newDay)
      updateStates()
    }

    function updateStates() {
      for (let i = 0; i < months.length; i++) {
        for (let j = 0; j < months[i].days.length; j++) {
          const day = months[i].days[j]

          if (day.state !== 'disabled') {
            const newState = getState(day.timestamp)

            if (newState !== day.state) {
              months[i].days[j] = getDayInfo(dayjs(day.timestamp), {
                state: newState
              })
            }
          }
        }
      }
    }

    let timeValue = [start.timestamp, end.timestamp]

    function onChange() {
      if (isSameArray([start.timestamp, end.timestamp], timeValue)) {
        return
      }

      timeValue = [start.timestamp, end.timestamp]
      emit('update:modelValue', getDetail().value)
      emit('change', getDetail().value)
    }

    function onSelect() {
      onChange()
      emit('select', getDetail())
    }

    function getDetail() {
      return formatter([start.timestamp, end.timestamp])
    }

    /**
     * 判断所选范围内有没有 disabled
     */
    function getRangeInfo(
      start: { monthIndex: number; dayIndex: number },
      end: { monthIndex: number; dayIndex: number }
    ) {
      let hasDisabled = false
      let rangeCount =
        start.monthIndex === end.monthIndex && start.dayIndex === end.dayIndex
          ? 1
          : 2

      for (let i = start.monthIndex; i <= end.monthIndex; i++) {
        for (
          let j = i === start.monthIndex ? start.dayIndex + 1 : 0,
            len = i === end.monthIndex ? end.dayIndex : months[i].days.length;
          j < len;
          j++
        ) {
          const day = months[i].days[j]

          if (!day.cover) {
            if (day.state === 'disabled') {
              hasDisabled = true
            } else {
              rangeCount++
            }
          }
        }
      }

      return {
        hasDisabled,
        rangeCount
      }
    }

    let monthActiveIndex = 0
    let bodyScrollTop = 0

    function onScroll(e: Event) {
      bodyScrollTop = getScrollTop(e.currentTarget as HTMLDivElement)

      updateBodyFixed(bodyScrollTop)
    }

    function updateBodyTitle(t: string, tY: number | null) {
      if (!bodyTitleEl.value) {
        return
      }

      bodyTitleEl.value.textContent = t
      bodyTitleEl.value.style.cssText = CSSProperties2CssText(
        getViewBodyTitleStyles(tY)
      )
    }

    function updateBodyFixed(scrollTop: number) {
      const h = 28
      const $items: HTMLDivElement[] = bodyEl.value
        ? [].slice.call(
            bodyEl.value.querySelectorAll('.fx-virtual-list_item'),
            0
          )
        : []

      function getItemName(vIndex: number) {
        const realIndex = $items[vIndex]
          ? parseInt($items[vIndex].dataset.index as string)
          : -1

        return realIndex === -1 ? '' : months[realIndex].caption
      }

      if ($items.length === 0) {
        updateBodyTitle('', null)
        return
      }

      const _index = monthActiveIndex
      const nextIndex = _index + 1
      const offsetTops = $items.map($el => {
        const matches = $el.style.cssText.match(
          /translate3d\(\w+,\s*(\d+)px,\s*\w+\)/
        )

        return matches && matches[1] ? parseFloat(matches[1]) : -1
      })

      const current = offsetTops[_index]
      const next =
        offsetTops[nextIndex] != null ? offsetTops[nextIndex] : Infinity
      const first = offsetTops[0]

      if (scrollTop < first) {
        updateBodyTitle('', null)
      } else if (scrollTop >= current) {
        if (scrollTop >= next) {
          monthActiveIndex = nextIndex
          updateBodyTitle(getItemName(nextIndex), 0)

          if (
            offsetTops[nextIndex + 1] &&
            scrollTop >= offsetTops[nextIndex + 1]
          ) {
            // 超过了
            updateBodyFixed(scrollTop)
          }
        } else if (next - scrollTop < h) {
          updateBodyTitle(getItemName(_index), next - scrollTop - h)
        } else {
          updateBodyTitle(getItemName(_index), 0)
        }
      } else {
        if (current - scrollTop < h) {
          updateBodyTitle(getItemName(_index - 1), current - scrollTop - h)
        } else {
          monthActiveIndex = _index - 1
          updateBodyTitle(getItemName(_index - 1), 0)

          if (offsetTops[_index - 1] && offsetTops[_index - 1] > scrollTop) {
            updateBodyFixed(scrollTop)
          }
        }
      }
    }

    function getItemSize(index: number) {
      return Math.ceil((months[index]?.days.length ?? 0) / 7) * 64 + 28
    }

    watch(
      [() => props.minDate, () => props.maxDate, locale],
      () => {
        updateOptions()
        updateOriginalValue([start.timestamp, end.timestamp])
      },
      {
        deep: true,
        immediate: true
      }
    )

    watch(
      () => props.modelValue,
      val => updateValue(val),
      {
        deep: true,
        immediate: true
      }
    )

    onMounted(() => {
      updateBodyFixed(bodyScrollTop)
    })

    return {
      mode,
      weekDays,
      months,
      onDaysClick,
      getDetail,
      locale,
      getItemSize,
      bodyEl,
      onScroll,
      bodyTitleEl
    }
  }
})
</script>
