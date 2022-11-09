<template>
  <div class="ta-side-tab">
    <ul class="ta-side-tab_list" ref="listEl">
      <li
        :class="getItemClasses(index, activeIndex)"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <Badge class="ta-side-tab_item-inner" v-bind="item.badge">
          <Icon
            v-if="item.icon"
            :icon="index === activeIndex ? item.activeIcon : item.icon"
          />
          <span class="ta-side-tab_item-text">{{ item.label }}</span>
        </Badge>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '../Icon'
import { Badge } from '../Badge'
import { tabEmits, tabProps } from '../Tab/tab'
import { useTab } from '../Tab/use-tab'
import { getItemClasses } from './util'
import type { PropsToEmits } from '../helpers/types'
import type { SideTabEmits } from './types'

export default defineComponent({
  name: 'ta-side-tab',
  components: { Icon, Badge },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: { ...tabEmits } as PropsToEmits<SideTabEmits>,
  setup(props, ctx) {
    return {
      getItemClasses,
      ...useTab(props, ctx, { tabName: 'SideTab' })
    }
  }
})
</script>
