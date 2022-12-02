import { thousands } from '../helpers'
import type { CountTime } from './types'

function formatNumber(num: number) {
  return (num > 9 ? '' : '0') + num
}

function cutOne(num: number, divisor: number) {
  return Math.floor(num / divisor)
}

export function getDefaultCountTime(): CountTime {
  return {
    time: 0,
    days: '0',
    fullHours: '0',
    thousandsFullHours: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '000'
  }
}

export function getCountTime(time: number): CountTime {
  const times = getDefaultCountTime()

  times.time = time
  times.milliseconds = (time % 1000 > 99 ? '' : '0') + formatNumber(time % 1000)
  time = cutOne(time, 1000)
  times.seconds = formatNumber(time % 60)
  time = cutOne(time, 60)
  times.minutes = formatNumber(time % 60)
  time = cutOne(time, 60)
  times.fullHours = formatNumber(time)
  times.thousandsFullHours = thousands(time)
  times.hours = formatNumber(time % 24)
  times.days = cutOne(time, 24).toString()

  return times
}
