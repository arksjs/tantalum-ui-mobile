<template>
  <div :class="classes">
    <Cell
      class="ta-collapse-item_header"
      :label="title"
      :icon="icon"
      :disabled="disabled"
      isLink
      :arrowDirection="active ? 'up' : 'down'"
      @click="onClick"
    />
    <div
      class="ta-collapse-item_body ta-horizontal-hairline"
      style="display: none"
      ref="bodyEl"
    >
      <div class="ta-collapse-item_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  inject,
  computed,
  shallowRef,
  type PropType
} from 'vue'
import { Cell } from '../Cell'
import { iconValidator, isBoolean, noop, type PropsToEmits } from '../helpers'
import { useGroupItem } from '../hooks'
import type { CollapseItemEmits } from './types'
import type { IconData } from '../Icon/types'
import { getItemClasses } from './util'

export default defineComponent({
  name: 'ta-collapse-item',
  components: { Cell },
  props: {
    icon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    toggle: payload => payload && isBoolean(payload.spread)
  } as PropsToEmits<CollapseItemEmits>,
  setup(props, { emit }) {
    const active = ref(false)
    const bodyEl = shallowRef<HTMLElement | null>(null)
    const onChange = inject<(uid: symbol) => void>('taCollapseChange', noop)
    const uid = Symbol()

    let visibleTimer: number

    function show(isClick = false) {
      if (active.value) {
        return
      }
      active.value = true

      clearTimeout(visibleTimer)

      const $body = bodyEl.value as HTMLElement

      $body.style.cssText = 'position: absolute; opacity: 0;'
      const contentHeight = $body.getBoundingClientRect().height
      $body.style.cssText = 'height: 0px;'

      visibleTimer = window.setTimeout(() => {
        $body.style.cssText = `height: ${contentHeight}px;`

        visibleTimer = window.setTimeout(() => {
          $body.style.cssText = ''
        }, 210)
      }, 17)

      emitToggle(true)

      isClick && onChange(uid)
    }

    function hide(isClick = false) {
      if (!active.value) {
        return
      }
      active.value = false

      clearTimeout(visibleTimer)

      const $body = bodyEl.value as HTMLElement
      $body.style.cssText = `height: ${$body.getBoundingClientRect().height}px;`

      visibleTimer = window.setTimeout(() => {
        $body.style.cssText = 'height: 0px;'

        visibleTimer = window.setTimeout(() => {
          $body.style.cssText = 'display: none;'
        }, 210)
      }, 17)

      emitToggle(false)

      isClick && onChange(uid)
    }

    function emitToggle(spread: boolean) {
      emit('toggle', {
        name: props.name,
        spread
      })
    }

    function onClick() {
      active.value ? hide(true) : show(true)
    }

    useGroupItem('collapse', {
      uid,
      getName: () => props.name,
      getActive: () => active.value,
      show,
      hide
    })

    const classes = computed(() => getItemClasses(active.value))

    return {
      active,
      bodyEl,
      onClick,
      classes
    }
  }
})
</script>
