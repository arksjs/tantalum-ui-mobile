<template>
  <div :class="classes">
    <ul class="ta-tab_list" ref="listEl" @scroll="updateUnderline">
      <li
        :class="getItemClasses(index, activeIndex)"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <Badge class="ta-tab_item-inner" v-bind="item.badge">
          <Icon v-if="item.icon" :icon="index === activeIndex ? item.activeIcon : item.icon" />
          <span class="ta-tab_item-text">{{ item.label }}</span>
        </Badge>
        <span class="ta-tab_item-sub-text" v-if="hasSub">{{ item.subLabel }}</span>
      </li>
    </ul>
    <span class="ta-tab_underline" ref="underlineEl"></span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Icon } from '../Icon'
import { Badge } from '../Badge'
import { tabEmits, tabProps } from './props'
import { useTab } from './use-tab'
import { getClasses, getItemClasses } from './util'
import type { PropsToEmits } from '../helpers'
import type { TabEmits } from './types'

export default defineComponent({
  name: 'ta-tab',
  components: { Icon, Badge },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: { ...tabEmits } as PropsToEmits<TabEmits>,
  setup(props, ctx) {
    const tab = useTab(props, ctx, { tabName: 'Tab' })

    const classes = computed(() => getClasses(tab.noScrolling.value, tab.hasSub.value))

    return {
      classes,
      getItemClasses,
      ...tab
    }
  }
})
</script>
