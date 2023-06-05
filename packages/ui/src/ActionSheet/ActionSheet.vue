<template>
  <Drawer
    class="ta-action-sheet"
    :title="title"
    placement="bottom"
    :visible="visible"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <ul class="ta-action-sheet_list">
      <li
        :class="getItemClasses(item)"
        v-for="(item, index) in options2"
        :key="index"
        @click="onItemClick(index)"
      >
        <div class="ta-action-sheet_item-inner">
          <span>{{ item.name }}</span>
          <small v-if="item.description">{{ item.description }}</small>
        </div>
      </li>
    </ul>
    <ul class="ta-action-sheet_list" v-if="showCancel">
      <li class="ta-action-sheet_item ta-horizontal-hairline" @click="onCancelClick">
        <div class="ta-action-sheet_item-inner align--center">
          <span>{{ cancelText || locale.actionSheetCancelText }}</span>
        </div>
      </li>
    </ul>
  </Drawer>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { Drawer } from '../Drawer'
import { usePopupExtend } from '../popup/use-popup'
import { popupEmits, popupExtendProps } from '../popup/props'
import type { Option, Detail, OnConfirm, ActionSheetEmits } from './types'
import { useLocale } from '../ConfigProvider/context'
import { isNumber, isString, type PropsToEmits, type VoidFnToBooleanFn } from '../helpers'
import { getItemClasses, getOptions } from './util'

const confirmValidator: VoidFnToBooleanFn<OnConfirm> = payload =>
  payload && isNumber(payload.index) && payload.item && isString(payload.item.name)

export default defineComponent({
  name: 'ta-action-sheet',
  components: { Drawer },
  props: {
    ...popupExtendProps,
    title: {
      type: String
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => [] as Option[]
    }
  },
  emits: {
    ...popupEmits,
    confirm: confirmValidator
  } as PropsToEmits<ActionSheetEmits>,
  setup(props, ctx) {
    const { locale } = useLocale()
    const popup = usePopupExtend<Detail>(ctx)

    function onItemClick(index: number) {
      popup.customConfirm({
        index,
        item: {
          name: props.options[index].name
        }
      })
    }

    const options2 = computed(() => getOptions(props.options))

    return {
      ...popup,
      options2,
      onItemClick,
      locale,
      getItemClasses
    }
  }
})
</script>
