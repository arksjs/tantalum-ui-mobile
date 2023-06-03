<template>
  <div class="ta-picker-view" ref="root">
    <div class="ta-picker-view_cols">
      <ViewCol
        v-for="(colItem, listIndex) in cols"
        :key="colItem.key"
        :list="colItem.rows"
        :listIndex="listIndex"
        :onListScroll="onListScroll"
      />
      <Empty :description="locale.pickerEmptyText" v-if="cols.length === 0" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, inject, shallowRef } from 'vue'
import { Empty } from '../Empty'
import { frameTo, type PropsToEmits } from '../helpers'
import { pickerViewEmits, pickerViewProps } from './props'
import { usePickerView } from '../Picker/use-picker'
import type { PickerHandlers, PickerViewEmits } from './types'
import { useLocale } from '../ConfigProvider/context'
import ViewCol from './PickerViewCol.vue'
import { DEFAULT_ITEM_HEIGHT, mergeHandlers } from './util'

interface ScrollElement extends HTMLElement {
  scrolling?: boolean
  scrollTimer?: number
}

export default defineComponent({
  name: 'ta-picker-view',
  components: { Empty, ViewCol },
  props: {
    ...pickerViewProps
  },
  emits: { ...pickerViewEmits } as PropsToEmits<PickerViewEmits>,
  setup(props, ctx) {
    const { locale } = useLocale()
    const root = shallowRef<HTMLElement | null>(null)
    const handlers = inject<Partial<PickerHandlers>>('taPickerHandlers', {})

    const { getDetail, cols, isCascade, update, updateColSelected, getValuesByRow, onChange } =
      usePickerView(props, ctx, {
        name: 'picker',
        afterUpdate: updatePos,
        handlers: mergeHandlers(
          {
            formatter: props.formatter,
            parser: props.parser
          },
          handlers
        )
      })

    function updatePos() {
      nextTick(() => {
        // 把选择数据展示在选择框内
        const $picker = root.value as HTMLElement

        if ($picker) {
          const $lists = $picker.querySelectorAll(`.ta-picker-view_list`)

          $lists.forEach(($el, index) => {
            const $list = $el as ScrollElement

            if (cols.value[index] && $list.scrolling !== true) {
              const list = cols.value[index]
              let selectIndex = -1

              for (let i = 0, len = list.rows.length; i < len; i++) {
                if (list.rows[i].selected) {
                  selectIndex = i
                  break
                }
              }

              requestAnimationFrame(() => {
                $list.scrollTop = DEFAULT_ITEM_HEIGHT * selectIndex
              })
            }
          })
        }
      })
    }

    function onListScroll(e: Event) {
      const $list = e.currentTarget as ScrollElement

      if ($list.scrolling) {
        return
      }

      clearTimeout($list.scrollTimer)

      const itemHeight = DEFAULT_ITEM_HEIGHT
      const colIndex = parseInt($list.dataset.index as string)
      const list = cols.value[colIndex]
      let current = Math.round($list.scrollTop / itemHeight)
      let oldSelectIndex = 0

      for (let i = 0; i < list.rows.length; i++) {
        if (list.rows[i].selected) {
          oldSelectIndex = i
          break
        }
      }

      let isChange = current !== oldSelectIndex
      if (isChange) {
        while (list.rows[current].disabled && current !== oldSelectIndex) {
          // 处理disabled 不能选的问题
          if (current > oldSelectIndex) {
            current--
          } else {
            current++
          }
        }
      }
      isChange = current !== oldSelectIndex

      const item = list.rows[current]

      if (current * itemHeight === $list.scrollTop && !isChange) {
        // 如果一致 就不需要修正了
      } else {
        $list.scrollTimer = window.setTimeout(() => {
          // $list.scrollTop = current * itemHeight
          $list.scrolling = true

          frameTo({
            from: $list.scrollTop,
            to: current * itemHeight,
            duration: 100,
            progress(res) {
              $list.scrollTop = res.current
            },
            complete() {
              $list.scrolling = false
            }
          })

          if (isChange) {
            if (isCascade.value) {
              update(getValuesByRow(item))
            } else {
              updateColSelected(colIndex, current)
            }

            onChange()
          }
        }, 400)
      }
    }

    return {
      root,
      cols,
      getDetail,
      onListScroll,
      resize: updatePos,
      locale
    }
  }
})
</script>
