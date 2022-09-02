<template>
  <Drawer
    class="ak-calendar-popup"
    placement="bottom"
    :visible="visible"
    :title="title"
    :showClose="showClose"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
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
    <div class="ak-calendar-popup_confirm" v-if="showConfirm">
      <Button type="primary" @click="onConfirmClick" :disabled="valueSize == 0"
        >{{ locale.calendarConfirmText }}
      </Button>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import CalendarView from './CalendarView.vue'
import { Drawer } from '../Drawer'
import { Button } from '../Button'
import { commonProps, calendarDetailValidator } from './props'
import { usePopupExtend } from '../popup/use-popup'
import { popupExtendProps } from '../popup/popup'
import { pickerPopupEmits } from '../Picker/props'
import { cloneDetail, isSameDetail, isValidValue } from '../Picker/util'
import type {
  CalendarDetail,
  CalendarPopupEmits,
  CalendarViewRef
} from './types'
import { useLocale } from '../ConfigProvider/context'
import { useHandlers } from './use-calendar'
import { cloneData } from '../helpers/util'
import type { PropsToEmits } from '../helpers/types'

export default defineComponent({
  name: 'ak-calendar-popup',
  components: { CalendarView, Drawer, Button },
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
    const viewRef = ref<CalendarViewRef>()
    const valueSize = ref(0)

    const { getDefaultDetail } = useHandlers(props)

    let detail: CalendarDetail = getDefaultDetail()

    const popup = usePopupExtend<CalendarDetail>(ctx)

    function onViewSelect(newDetail: CalendarDetail) {
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
        emit('change', getDetail().value)
      } else {
        updateDetail(newDetail)
      }

      popup.customConfirm(getDetail())
    }

    function getDetail() {
      return cloneDetail(detail)
    }

    function updateDetail(newDetail: CalendarDetail) {
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
