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
import { defineComponent, ref, computed, shallowRef, type PropType } from 'vue'
import { Cell } from '../Cell'
import { iconValidator, isBoolean, type PropsToEmits } from '../helpers'
import { useException, useGroupItem } from '../hooks'
import type {
  CollapseContextValue,
  CollapseItemEmits,
  CollapseContextItemRef
} from './types'
import type { IconData } from '../Icon/types'
import { getItemClasses } from './util'
import { CollapseContext } from './context'

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
    const { printItemIsolationWarn } = useException()
    const uid = Symbol()
    const bodyEl = shallowRef<HTMLElement | null>(null)
    const active = ref(false)

    const { onChange } = useGroupItem<
      CollapseContextValue,
      CollapseContextItemRef
    >(CollapseContext, {
      uid,
      show,
      hide,
      getName: () => props.name,
      getActive: () => active.value
    })

    function handleChange(uid: symbol) {
      if (onChange) {
        onChange(uid)
      } else {
        printItemIsolationWarn()
      }
    }

    let visibleTimer: number

    function show(isClick = false) {
      if (active.value) {
        return
      }
      active.value = true

      clearTimeout(visibleTimer)
      if (!bodyEl.value) {
        return
      }
      const $body = bodyEl.value

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

      isClick && handleChange(uid)
    }

    function hide(isClick = false) {
      if (!active.value) {
        return
      }
      active.value = false

      if (!bodyEl.value) {
        return
      }
      clearTimeout(visibleTimer)
      const $body = bodyEl.value

      $body.style.cssText = `height: ${$body.getBoundingClientRect().height}px;`

      visibleTimer = window.setTimeout(() => {
        $body.style.cssText = 'height: 0px;'

        visibleTimer = window.setTimeout(() => {
          $body.style.cssText = 'display: none;'
        }, 210)
      }, 17)

      emitToggle(false)

      isClick && handleChange(uid)
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
