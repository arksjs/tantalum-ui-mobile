<template>
  <div class="ta-picker-view_col">
    <VirtualList
      class="ta-picker-view_list"
      :data-index="listIndex"
      :ids="list.map(v => v.value)"
      :itemSize="getItemSize"
      @scroll.stop="onListScroll"
    >
      <template #default="{ index }">
        <div
          class="ta-picker-view_item"
          :class="{
            selected: list[index].selected,
            disabled: list[index].disabled
          }"
          :data-index="index"
        >
          {{ list[index].label }}
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { VirtualList } from '../VirtualList'
import type { ColRow } from './types'
import { DEFAULT_ITEM_HEIGHT } from './util'

export default defineComponent({
  name: 'ta-picker-view-col',
  components: { VirtualList },
  props: {
    list: {
      type: Array as PropType<ColRow[]>,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
    onListScroll: {
      type: Function as PropType<(payload: UIEvent) => void>,
      required: true
    }
  },
  setup(props) {
    function getItemSize(index: number) {
      if (props.list.length === 1) {
        return DEFAULT_ITEM_HEIGHT * 5
      }

      if (index === 0 || index >= props.list.length - 1) {
        return DEFAULT_ITEM_HEIGHT * 3
      }

      return DEFAULT_ITEM_HEIGHT
    }

    return {
      getItemSize
    }
  }
})
</script>
