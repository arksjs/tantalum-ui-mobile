<template>
  <div :class="classes">
    <Cell
      class="ak-collapse-item_header"
      :label="title"
      :icon="icon"
      :disabled="disabled"
      isLink
      :arrowDirection="active ? 'up' : 'down'"
      @click="onClick"
    />
    <div
      class="ak-collapse-item_body ak-horizontal-hairline"
      style="display: none"
      ref="bodyEl"
    >
      <div class="ak-collapse-item_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue'
import type { PropType } from 'vue'
import { Cell } from '../Cell'
import { iconValidator } from '../helpers/validator'
import { useGroupItem } from '../hooks/use-group'
import Exception from '../helpers/exception'
import type { CollapseItemEmits } from './types'
import type { PropsToEmits } from '../helpers/types'
import type { IconData } from '../Icon/types'
import { getItemClasses } from './util'
import { isBoolean } from '../helpers/util'

export default defineComponent({
  name: 'ak-collapse-item',
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
      type: [Number, String],
      default: '',
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
    const bodyEl = ref<HTMLElement>()
    const onChange = inject('akCollapseChange', collapseItemChange)
    const uid = Symbol()

    function collapseItemChange(uid: symbol) {
      new Exception(
        `CollapseItem is not in Collapse`,
        Exception.TYPE.DEFAULT,
        'CollapseItem'
      )
    }

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
