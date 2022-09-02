<template>
  <div :class="classes">
    <ul class="ak-tab_list" ref="listEl">
      <li
        :class="getItemClasses(index, activeIndex)"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <Badge class="ak-tab_item-inner" v-bind="item.badge">
          <Icon
            v-if="item.icon"
            :icon="index === activeIndex ? item.activeIcon : item.icon"
          />
          <span class="ak-tab_item-text">{{ item.label }}</span>
        </Badge>
        <span class="ak-tab_item-sub-text" v-if="hasSub">{{
          item.subLabel
        }}</span>
      </li>
    </ul>
    <span class="ak-tab_underline" ref="underlineEl"></span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Icon } from '../Icon'
import { Badge } from '../Badge'
import { tabEmits, tabProps } from '../Tab/tab'
import { useTab } from '../Tab/use-tab'
import { getClasses, getItemClasses } from './util'

export default defineComponent({
  name: 'ak-tab',
  components: { Icon, Badge },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: { ...tabEmits },
  setup(props, ctx) {
    const tab = useTab(props, ctx, { tabName: 'Tab' })

    const classes = computed(() =>
      getClasses(props.scrollThreshold, tab.options2.value, tab.hasSub.value)
    )

    return {
      classes,
      getItemClasses,
      ...tab
    }
  }
})
</script>
