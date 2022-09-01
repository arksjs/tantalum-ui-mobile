<template>
  <div :class="classes">
    <slot></slot>
    <Avatar
      class="fx-avatar-group_count"
      v-if="totalCount != null"
      :color="countColor"
    >
      <span :class="countClasses">
        {{ showCount }}
      </span>
    </Avatar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Avatar from './Avatar.vue'
import { avatarProps } from './props'
import { useProvider } from './context'
import { getGroupClasses, getGroupCountClasses, getShowCount } from './util'

export default defineComponent({
  name: 'fx-avatar-group',
  components: { Avatar },
  props: {
    ...avatarProps,
    totalCount: {
      type: Number,
      default: null
    },
    countColor: {
      type: String
    }
  },
  setup(props) {
    const { childCount } = useProvider(props)

    const showCount = computed(() => getShowCount(props.totalCount))

    const classes = computed(() => getGroupClasses(childCount.value))
    const countClasses = computed(() => getGroupCountClasses(showCount.value))

    return { classes, showCount, countClasses }
  }
})
</script>
