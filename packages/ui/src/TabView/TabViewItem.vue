<template>
  <div
    class="ak-swiper-item ak-tab-view-item"
    :data-name="name"
    :data-sub-name="subName"
    ref="root"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
import { useListItem } from '../hooks/use-list'
import { useTouch } from '../hooks/use-touch'

interface TabViewItemCoords {
  vertical: boolean
  startX: number
  startY: number
  timeStamp: number
  position: number
  stop: boolean
}

export default defineComponent({
  name: 'ak-tab-view-item',
  props: {
    name: {
      type: String,
      required: true
    },
    subName: {
      type: String,
      default: null
    }
  },
  setup() {
    const root = ref<HTMLElement>()
    const vertical = inject('akTabViewVertical', false)

    useListItem('swiper')
    useListItem('tabView')

    // onUpdated(() => {
    //   const $item = root.value as HTMLElement

    //   if ($item.offsetWidth === 0 || $item.offsetHeight === 0) {
    //     // 解决默认 hidden 的问题
    //     update()
    //   }
    // })

    let coords: TabViewItemCoords | null

    useTouch({
      el: root,
      onTouchStart(e) {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
          scrollLeft,
          scrollWidth,
          clientWidth
        } = e.currentTarget as HTMLElement

        const touch = e.touchObject

        if (
          (vertical &&
            (scrollHeight === scrollTop + clientHeight || scrollTop === 0)) ||
          (!vertical &&
            (scrollWidth === scrollLeft + clientWidth || scrollLeft === 0))
        ) {
          if (scrollHeight !== clientHeight || scrollWidth !== clientWidth) {
            coords = {
              vertical,
              position:
                (vertical && scrollTop === 0) || (!vertical && scrollLeft === 0)
                  ? 1
                  : 2,
              startX: touch.pageX,
              startY: touch.pageY,
              timeStamp: e.timeStamp,
              stop: false
            }
          }
        } else {
          // 滚动到中间，直接拒绝掉
          coords = {
            vertical,
            position: 1,
            startX: 0,
            startY: 0,
            timeStamp: e.timeStamp,
            stop: true
          }
          // e.stopPropagation()
        }
      },
      onTouchMove(e) {
        if (!coords) {
          return
        }

        if (coords.stop) {
          e.stopPropagation()
          return
        }

        const { pageX, pageY } = e.touchObject

        const offset = coords.vertical
          ? coords.startY - pageY
          : coords.startX - pageX

        if (
          (coords.position === 1 && offset > 0) ||
          (coords.position === 2 && offset < 0)
        ) {
          coords.stop = true
          e.stopPropagation()
        }
      },
      onTouchEnd() {
        coords = null
      }
    })

    return {
      root
    }
  }
})
</script>
