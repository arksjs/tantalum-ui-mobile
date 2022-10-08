<template>
  <div class="ak-calendar" :class="{ disabled }" ref="root">
    <SelectorField
      :label="fieldLabel"
      :value="fieldValue"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      @fieldClick="onFieldClick"
    />
    <CalendarPopup
      :modelValue="modelValue"
      :minDate="minDate"
      :maxDate="maxDate"
      :initialMode="initialMode"
      :allowSameDay="allowSameDay"
      :maxRange="maxRange"
      :dayHandler="dayHandler"
      :firstDayOfWeek="firstDayOfWeek"
      :title="placeholder"
      :formatter="formatter"
      :parser="parser"
      :showConfirm="showConfirm"
      :showClose="showClose"
      v-model:visible="popupVisible"
      v-if="isInitPopup"
      @confirm="onConfirm"
      ref="popup"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { SelectorField } from '../SelectorField'
import CalendarPopup from './CalendarPopup.vue'
import { commonProps } from './props'
import type { CalendarDetail, CalendarPopupRef } from './types'
import { useHandlers } from '../Calendar/use-calendar'
import { cloneDetail, isSameValue } from '../Picker/util'
import { pickerEmits, pickerProps } from '../Picker/props'

export default defineComponent({
  name: 'ak-calendar',
  components: { SelectorField, CalendarPopup },
  props: {
    ...commonProps,
    ...pickerProps,
    showConfirm: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: { ...pickerEmits },
  setup(props, ctx) {
    const { emit } = ctx
    const isInitPopup = ref(false)
    const popupVisible = ref(true)
    const fieldLabel = ref('')
    const fieldValue = ref('')
    const popup = ref<CalendarPopupRef>()
    const root = ref<HTMLElement>()

    const { formatter, parser, getDefaultDetail } = useHandlers(props)

    let detail: CalendarDetail = getDefaultDetail()

    function getPopupDetail() {
      return popup.value?.getDetail() || getDefaultDetail()
    }

    function updateValue(val: unknown) {
      if (val == null) {
        // 解决 formily 强制null的问题
        return
      }

      updateDetail(formatter(parser(val)))
    }

    function updateDetail(newDetail: CalendarDetail) {
      detail = newDetail

      fieldLabel.value = newDetail.label
      fieldValue.value =
        detail.value != null
          ? detail.valueArray.map(v => v.join('-')).join(',')
          : ''
    }

    function onFieldClick() {
      if (!props.disabled) {
        if (!isInitPopup.value) {
          isInitPopup.value = true
        } else {
          popupVisible.value = true
        }
      }
    }

    function getDetail() {
      return cloneDetail(detail)
    }

    function onConfirm() {
      const newDetail = getPopupDetail()

      if (isSameValue(detail.value, newDetail.value)) {
        return
      }

      updateDetail(newDetail)

      emit('update:modelValue', getDetail().value)
      emit('change', getDetail().value)
    }

    watch(
      () => props.modelValue,
      val => updateValue(val),
      {
        deep: true,
        immediate: true
      }
    )

    watch([isInitPopup, popupVisible], ([isInit, visible]) => {
      if (isInit && visible) {
        emit('focus')
      } else if (!visible) {
        emit('blur')
      }
    })

    return {
      root,
      isInitPopup,
      popupVisible,
      fieldLabel,
      fieldValue,
      popup,
      onFieldClick,
      onConfirm
    }
  }
})
</script>
