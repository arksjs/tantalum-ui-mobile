<template>
  <Drawer
    class="ta-calendar-popup"
    placement="bottom"
    :visible="visible"
    :title="title"
    :showClose="showClose"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <CalendarView
      :modelValue="modelValue"
      :minDate="minDate"
      :maxDate="maxDate"
      :initialMode="initialMode"
      :allowSameDay="allowSameDay"
      :maxRange="maxRange"
      :dayHandler="dayHandler"
      :firstDayOfWeek="firstDayOfWeek"
      :formatter="formatter"
      :parser="parser"
      ref="viewRef"
      @select="onViewSelect"
    />
    <div class="ta-calendar-popup_confirm" v-if="showConfirm">
      <TaButton type="primary" size="large" @click="onConfirmClick" :disabled="valueSize == 0"
        >{{ locale.calendarConfirmText }}
      </TaButton>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import CalendarView from './CalendarView.vue'
import { Drawer } from '../Drawer'
import { Button as TaButton } from '../Button'
import { commonProps, calendarDetailValidator } from './props'
import { usePopupExtend } from '../popup/use-popup'
import { popupExtendProps } from '../popup/props'
import { pickerPopupEmits } from '../Picker/props'
import { cloneDetail, isSameDetail, isValidValue } from '../Picker/util'
import type {
  CalendarSelectorDetail,
  CalendarPopupEmits,
  CalendarViewRef,
  CalendarDetail
} from './types'
import { useLocale } from '../ConfigProvider/context'
import { useHandlers } from './use-calendar'
import { cloneData, type PropsToEmits } from '../helpers'
import { getSourceDetail } from './util'

export default defineComponent({
  name: 'ta-calendar-popup',
  components: { CalendarView, Drawer, TaButton },
  props: {
    ...commonProps,
    ...popupExtendProps,
    title: {
      type: String
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    ...pickerPopupEmits,
    confirm: calendarDetailValidator
  } as PropsToEmits<CalendarPopupEmits>,
  setup(props, ctx) {
    const { emit } = ctx
    const { locale } = useLocale()
    const viewRef = shallowRef<CalendarViewRef | null>(null)
    const valueSize = ref(0)

    const { getDefaultDetail } = useHandlers(props)

    let detail: CalendarSelectorDetail = getDefaultDetail()

    const popup = usePopupExtend<CalendarDetail>(ctx)

    function onViewSelect() {
      const newDetail = getViewDetail()

      valueSize.value = newDetail.valueArray.length

      if (!props.showConfirm) {
        confirm()
      } else {
        // 判断下是否可以confirm
        valueSize.value = newDetail.valueArray.length
      }
    }

    function onConfirmClick() {
      confirm()
    }

    function confirm() {
      const newDetail = getViewDetail()

      if (!isSameDetail(newDetail, detail)) {
        updateDetail(newDetail)

        emit('update:modelValue', getDetail().value)
        const { value, label } = getDetail()
        emit('change', value, label)
      } else {
        updateDetail(newDetail)
      }

      popup.customConfirm(getSourceDetail(getDetail()))
    }

    function getDetail() {
      return cloneDetail(detail)
    }

    function updateDetail(newDetail: CalendarSelectorDetail) {
      detail = newDetail
      valueSize.value = newDetail.valueArray.length
    }

    function getViewDetail() {
      return viewRef.value?.getDetail() || getDefaultDetail()
    }

    if (isValidValue(props.modelValue)) {
      // 如果默认设置了modelValue，先缓存一下
      detail.value = cloneData(props.modelValue)
    }

    watch(
      () => props.modelValue,
      () => {
        nextTick(() => {
          detail = getViewDetail()
        })
      },
      {
        deep: true
      }
    )

    onMounted(() => {
      detail = getViewDetail()
    })

    return {
      ...popup,
      valueSize,
      viewRef,
      onViewSelect,
      onConfirmClick,
      getDetail,
      locale
    }
  }
})
</script>
