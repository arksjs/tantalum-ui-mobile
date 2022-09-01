<template>
  <div class="fx-tab-bar fx-horizontal-hairline" :style="styles">
    <ul class="fx-tab-bar_list" ref="listEl">
      <li
        :class="getItemClasses(index, activeIndex)"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <Badge class="fx-tab-bar_item-icon" v-bind="item.badge">
          <Image
            v-if="item.iconLink"
            :src="index === activeIndex ? item.activeIconLink : item.iconLink"
          />
          <Icon
            v-else-if="item.icon"
            :icon="index === activeIndex ? item.activeIcon : item.icon"
          />
        </Badge>
        <span class="fx-tab-bar_item-text">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Image } from '../Image'
import { Icon } from '../Icon'
import { Badge } from '../Badge'
import { tabEmits, tabProps } from '../Tab/tab'
import { useTab } from '../Tab/use-tab'
import { getItemClasses } from './util'

export default defineComponent({
  name: 'fx-tab-bar',
  components: { Image, Icon, Badge },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: { ...tabEmits },
  setup(props, ctx) {
    return {
      getItemClasses,
      ...useTab(props, ctx, { tabName: 'TabBar' })
    }
  }
})
</script>
