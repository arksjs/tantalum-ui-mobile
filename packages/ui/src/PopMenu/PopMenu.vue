<template>
  <Popover
    class="ta-pop-dialog"
    :visible="visible"
    :selector="selector"
    :placement="placement"
    :showMask="showMask"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <ul
      class="ta-pop-menu_list ta-pop-menu_list"
      v-if="options2 && options2.length > 0"
    >
      <li
        :class="getItemClasses(item)"
        v-for="(item, index) in options2"
        :key="index"
        @click="onItemClick(index)"
      >
        <div class="ta-pop-menu_item-inner">
          <Icon v-if="item.icon" :icon="item.icon" />
          <span>{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </Popover>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { Popover } from '../Popover'
import { Icon } from '../Icon'
import type { Option, Detail, PopMenuEmits } from './types'
import { getOptions, getItemClasses } from './util'
import { isNumber, isString, type PropsToEmits } from '../helpers'
import { popoverProps, popoverEmits } from '../Popover/props'
import { usePopupExtend } from '../popup/use-popup'

export default defineComponent({
  name: 'ta-pop-menu',
  components: { Icon, Popover },
  props: {
    ...popoverProps,
    options: {
      type: Array as PropType<Option[]>
    }
  },
  emits: {
    ...popoverEmits,
    confirm: payload =>
      payload &&
      isNumber(payload.index) &&
      payload.item &&
      isString(payload.item.name)
  } as PropsToEmits<PopMenuEmits>,
  setup(props, ctx) {
    const popup = usePopupExtend<Detail>(ctx)

    function onItemClick(index: number) {
      const item = props.options?.[index]

      if (!item || item.disabled) {
        return
      }

      popup.customConfirm({
        item: {
          name: item.name
        },
        index
      })
    }

    const options2 = computed(() => getOptions(props.options))

    return {
      ...popup,
      onItemClick,
      options2,
      getItemClasses
    }
  }
})
</script>
