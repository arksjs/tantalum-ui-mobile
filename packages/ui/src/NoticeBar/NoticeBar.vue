<template>
  <div :class="classes" :style="styles" @click="onClick">
    <div v-if="leftIcon" class="ak-notice-bar_left-icon">
      <Icon :icon="leftIcon" />
    </div>
    <div class="ak-notice-bar_content">
      <div ref="contentEl" :class="contentClasses" :style="contentStyles">
        <slot>
          {{ title }}
        </slot>
      </div>
    </div>
    <div
      v-if="rightIcon2"
      class="ak-notice-bar_right-icon"
      @click="onRightIconClick"
    >
      <Icon :icon="rightIcon2" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  shallowRef
} from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import {
  colorValidator,
  createEnumsValidator,
  emitClickValidator,
  iconValidator
} from '../helpers/validator'
import type { OnClick, PropsToEmits, StateType } from '../helpers/types'
import { STATE_TYPES } from '../helpers/constants'
import type { Mode, NoticeBarEmits } from './types'
import RightOutlined from '../Icon/icons/RightOutlined'
import CloseOutlined from '../Icon/icons/CloseOutlined'
import type { IconData } from '../Icon/types'
import {
  getClasses,
  getContentClasses,
  getContentStyles,
  getStyles
} from './util'

const modeMaps = new Map<Mode, IconData | null>([
  ['default', null],
  ['clickable', RightOutlined],
  ['closable', CloseOutlined]
])

export default defineComponent({
  name: 'ak-notice-bar',
  components: { Icon },
  props: {
    title: {
      type: String,
      default: ''
    },
    // 通知栏模式
    mode: {
      type: String as PropType<Mode>,
      validator: (val: Mode) => modeMaps.get(val) !== undefined,
      default: 'default' as Mode
    },
    // 左侧图标名称
    leftIcon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator
    },
    // 右边侧图标名称
    rightIcon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator
    },
    color: {
      type: String,
      validator: colorValidator
    },
    // 是否采用跑马灯显示
    marquee: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<StateType>,
      validator: createEnumsValidator(STATE_TYPES)
    }
  },
  emits: {
    click: emitClickValidator,
    closeClick: emitClickValidator
  } as PropsToEmits<NoticeBarEmits>,
  setup(props, { emit }) {
    const marqueeX = ref(0)
    const marqueeDuration = ref(0)
    const contentEl = shallowRef<HTMLElement | null>(null)
    let marqueeTimer: number

    function marqueeStep(x: number, pW: number) {
      marqueeX.value = pW
      marqueeDuration.value = 0

      marqueeTimer = window.setTimeout(() => {
        marqueeX.value = -x
        marqueeDuration.value = x / 30

        marqueeTimer = window.setTimeout(() => {
          marqueeStep(x, pW)
        }, (x / 28) * 1000)
      }, 17)
    }

    function stopMarquee() {
      clearTimeout(marqueeTimer)

      marqueeX.value = 0
      marqueeDuration.value = 0
    }

    function startMarquee() {
      stopMarquee()

      const $content = contentEl.value as HTMLElement

      const w = $content.offsetWidth
      const pW = ($content.parentElement as HTMLElement).offsetWidth

      if (w > pW) {
        marqueeStep(w, pW)
      }
    }

    function resetMarquee() {
      props.marquee ? startMarquee() : stopMarquee()
    }

    const onClick: OnClick = e => {
      if (props.mode === 'clickable') {
        emit('click', e)
      }
    }

    const onRightIconClick: OnClick = e => {
      if (props.mode === 'closable') {
        emit('closeClick', e)
      }
    }

    onMounted(() => props.marquee && startMarquee())

    onBeforeUnmount(() => stopMarquee())

    watch([() => props.marquee, () => props.title], () => {
      resetMarquee()
    })

    const rightIcon2 = computed(() => {
      return props.rightIcon || modeMaps.get(props.mode) || null
    })

    const classes = computed(() => getClasses(props.type))
    const styles = computed(() => getStyles(props.color))
    const contentClasses = computed(() => getContentClasses(props.marquee))
    const contentStyles = computed(() =>
      getContentStyles({
        marqueeX: marqueeX.value,
        marqueeDuration: marqueeDuration.value
      })
    )

    return {
      contentEl,
      rightIcon2,
      classes,
      styles,
      contentClasses,
      contentStyles,
      onClick,
      onRightIconClick
    }
  }
})
</script>
