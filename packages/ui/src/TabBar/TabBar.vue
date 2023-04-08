<template>
  <div :class="classes" :style="styles">
    <ul class="ta-tab-bar_list" ref="listEl">
      <li
        :class="getItemClasses(index, activeIndex)"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <div class="ta-tab-bar_item-inner">
          <Badge class="ta-tab-bar_item-icon" v-bind="item.badge">
            <TaImage
              v-if="item.iconLink"
              :src="index === activeIndex ? item.activeIconLink : item.iconLink"
            />
            <Icon
              v-else-if="item.icon"
              :icon="index === activeIndex ? item.activeIcon : item.icon"
            />
          </Badge>
          <span class="ta-tab-bar_item-text">{{ item.label }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Image as TaImage } from '../Image'
import { Icon } from '../Icon'
import { Badge } from '../Badge'
import { tabEmits, tabProps } from '../Tab/props'
import { useTab } from '../Tab/use-tab'
import { getClasses, getItemClasses } from './util'
import type { PropsToEmits } from '../helpers'
import type { TabBarEmits } from './types'

export default defineComponent({
  name: 'ta-tab-bar',
  components: { TaImage, Icon, Badge },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 5
    }
  },
  emits: { ...tabEmits } as PropsToEmits<TabBarEmits>,
  setup(props, ctx) {
    const tab = useTab(props, ctx, { tabName: 'TabBar' })

    const classes = computed(() => getClasses(tab.noScrolling.value))

    return {
      classes,
      getItemClasses,
      ...tab
    }
  }
})
</script>
