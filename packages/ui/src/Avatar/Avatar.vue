<template>
  <Badge :class="classes" :style="styles" v-bind="{ ...$attrs, ...badge2 }">
    <slot>
      <AkImage
        class="ak-avatar_image"
        :src="src"
        mode="aspectFill"
        :loadingIcon="UserOutlined"
      />
    </slot>
    <template #badge>
      <Icon v-if="gender === 'man'" :icon="ManOutlined" />
      <Icon v-else-if="gender === 'woman'" :icon="WomanOutlined" />
    </template>
  </Badge>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import { Badge } from '../Badge'
import { Image as AkImage } from '../Image'
import { colorValidator, createEnumsValidator } from '../helpers/validator'
import { avatarProps } from './props'
import {
  AVATAR_SHAPE_TYPES,
  getAvatarClasses,
  getAvatarSize,
  getBadgeProps,
  getAvatarShape,
  getAvatarStyles
} from './util'
import type { Gender, ShapeType } from './types'
import type { BadgeOption } from '../Badge/types'
import ManOutlined from '../Icon/icons/ManOutlined'
import WomanOutlined from '../Icon/icons/WomanOutlined'
import UserOutlined from '../Icon/icons/UserOutlined'
import { useConsumer } from './context'

export default defineComponent({
  name: 'ak-avatar',
  components: { Badge, AkImage, Icon },
  props: {
    ...avatarProps,
    shape: {
      type: String as PropType<ShapeType>,
      validator: createEnumsValidator(AVATAR_SHAPE_TYPES),
      default: null
    },
    src: {
      type: String,
      default: null
    },
    badge: {
      type: [Number, String, Object] as PropType<BadgeOption>
    },
    gender: {
      type: String as PropType<Gender>
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const { groupOptions } = useConsumer()

    const size2 = computed(() => getAvatarSize(props, groupOptions))
    const shape2 = computed(() => getAvatarShape(props, !!groupOptions))
    const classes = computed(() =>
      getAvatarClasses(props, size2.value, shape2.value)
    )
    const styles = computed(() => getAvatarStyles(props, size2.value))
    const badge2 = computed(() => getBadgeProps(props))

    return {
      classes,
      styles,
      badge2,
      UserOutlined,
      ManOutlined,
      WomanOutlined
    }
  }
})
</script>
