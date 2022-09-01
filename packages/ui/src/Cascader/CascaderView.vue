<template>
  <div class="fx-cascader-view">
    <Tab
      class="fx-cascader-view_header"
      :options="tabs"
      :scrollThreshold="0"
      v-model:activeValue="tabIndex"
    />
    <div class="fx-cascader-view_body">
      <div
        class="fx-cascader-view_group fx-vertical-hairline"
        v-for="(colItem, colIndex) in cols"
        :key="colItem.key"
        :style="{
          zIndex: tabIndex == colIndex ? 2 : 1
        }"
      >
        <VirtualList
          class="fx-cascader-view_list"
          :data-index="colIndex"
          :ids="colItem.rows.map(v => v.value)"
          :itemSize="44"
        >
          <template #default="{ index }">
            <div
              class="fx-cascader-view_item fx-horizontal-hairline"
              :class="{
                selected: colItem.rows[index].selected,
                disabled: colItem.rows[index].disabled
              }"
              @click="onItemClick($event, colItem.rows[index])"
            >
              <span class="fx-cascader-view_item-text">
                {{ colItem.rows[index].label }}
              </span>
              <Icon v-if="colItem.rows[index].selected" :icon="CheckOutlined" />
            </div>
          </template>
        </VirtualList>
      </div>
      <Empty :description="locale.cascaderEmptyText" v-if="cols.length === 0" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
import { Tab } from '../Tab'
import { Icon } from '../Icon'
import { Empty } from '../Empty'
import { VirtualList } from '../VirtualList'
import { isSameArray } from '../helpers/util'
import type { ColRow } from '../Picker/types'
import type { SelectorValue } from '../SelectorField/types'
import type { OptionItem as TabOptionItem } from '../Tab/types'
import { pickerViewEmits, commonProps, isPickerDetail } from '../Picker/props'
import { mergeHandlers } from '../Picker/util'
import { usePickerView } from '../Picker/use-picker'
import { useLocale } from '../ConfigProvider/context'
import CheckOutlined from '../Icon/icons/CheckOutlined'
import type { PropsToEmits } from '../helpers/types'
import type { CascaderViewEmits } from './types'

interface SelectedTabs {
  label: string | null
  value: number | string
}

export default defineComponent({
  name: 'fx-cascader-view',
  components: { Tab, Icon, Empty, VirtualList },
  props: {
    ...commonProps
  },
  emits: {
    ...pickerViewEmits,
    select: payload => isPickerDetail(payload)
  } as PropsToEmits<CascaderViewEmits>,
  setup(props, ctx) {
    const { emit } = ctx
    const { locale } = useLocale()
    const selectedTabs = ref<SelectedTabs[]>([])
    const tabs = ref<TabOptionItem[]>([])
    const tabIndex = ref(0)
    let tempTabIndex = -1

    function onItemClick(e: Event, item: ColRow) {
      if (item.disabled) {
        return
      }

      const selecteds = getValuesByRow(item)

      update(selecteds)

      if (!item.hasChildren) {
        if (!isSameArray(currentValues.value, selecteds)) {
          onSelect(selecteds)
          onChange()
        } else {
          onSelect(selecteds)
        }
      }
    }

    function onSelect(selecteds: SelectorValue[]) {
      const selectDetail = updateOriginalValue(selecteds)
      emit('select', selectDetail)
    }

    const {
      currentValues,
      getDetail,
      cols,
      update,
      getValuesByRow,
      updateOriginalValue,
      onChange
    } = usePickerView(props, ctx as any, {
      name: 'cascader',
      afterUpdate(valueArray, labelArray, cols) {
        selectedTabs.value = []

        labelArray.forEach((v, k) => {
          selectedTabs.value.push({
            label: v,
            value: k
          })
        })

        if (labelArray.length < cols.length) {
          selectedTabs.value.push({
            label: null,
            value: selectedTabs.value.length
          })
        }

        tempTabIndex = selectedTabs.value.length - 1
      },
      handlers: mergeHandlers({
        formatter: props.formatter,
        parser: props.parser
      })
    })

    watch(
      [locale, selectedTabs],
      ([newLocale, newOptions]) => {
        tabs.value = newOptions.map(v => {
          return {
            label: v.label == null ? newLocale.cascaderDefaultTitle : v.label,
            value: v.value
          }
        })

        nextTick(() => {
          if (tempTabIndex !== -1) {
            tabIndex.value = tempTabIndex
            tempTabIndex = -1
          }
        })
      },
      {
        deep: true,
        immediate: true
      }
    )

    return {
      tabIndex,
      tabs,
      cols,
      getDetail,
      onItemClick,
      locale,
      CheckOutlined
    }
  }
})
</script>
