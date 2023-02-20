<template>
  <div class="ta-scroll-tab">
    <div class="ta-scroll-tab_sidebar">
      <Sticky
        ref="sideRef"
        :offsetTop="stickyOffsetTop"
        :offsetBottom="stickyOffsetBottom"
      >
        <SideTab
          v-if="tabList.length > 0"
          :options="tabList"
          :modelValue="activeName"
          @change="onTabChange"
        />
      </Sticky>
    </div>
    <div class="ta-scroll-tab_body">
      <StickyView
        :offsetTop="stickyOffsetTop"
        :modelValue="modelValue"
        ref="bodyRef"
        @resetItems="onResetItems"
        @change="onStickyViewChange"
      >
        <slot></slot>
      </StickyView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, watch } from 'vue'
import { SideTab } from '../SideTab'
import { Sticky } from '../Sticky'
import { StickyView } from '../StickyView'
import { isSizeValue, isString, type PropsToEmits } from '../helpers'
import type {
  StickyViewOnResetItems,
  StickyViewRef,
  StickyViewOnChange
} from '../StickyView/types'
import { emitChangeValidator } from '../StickyView/props'
import type { ResetContainer, StickyRef } from '../Sticky/types'
import type { ScrollTabEmits } from './types'
import type { SideTabOnChange } from '../SideTab/types'

export default defineComponent({
  name: 'ta-scroll-tab',
  components: { SideTab, Sticky, StickyView },
  props: {
    modelValue: {
      type: String
    },
    stickyOffsetTop: {
      type: [Number, String],
      validator: isSizeValue,
      default: 0
    },
    stickyOffsetBottom: {
      type: [Number, String],
      validator: isSizeValue,
      default: 0
    }
  },
  emits: {
    'update:modelValue': name => isString(name),
    change: emitChangeValidator
  } as PropsToEmits<ScrollTabEmits>,
  setup(props, { emit, expose }) {
    const sideRef = shallowRef<StickyRef | null>(null)
    const bodyRef = shallowRef<StickyViewRef | null>(null)
    const tabList = ref<
      {
        value: string
        label: string
      }[]
    >([])
    const activeName = ref<string>()

    // 单独更新以下tab的activeName
    function updateActiveName(name?: string) {
      if (name != null && nameInList(name) && name !== activeName.value) {
        activeName.value = name
      }
    }

    function nameInList(name: string) {
      for (let i = 0; i < tabList.value.length; i++) {
        if (tabList.value[i].value === name) {
          return true
        }
      }

      return false
    }

    const onTabChange: SideTabOnChange = (name, index) => {
      scrollToIndex(index)
    }

    const onStickyViewChange: StickyViewOnChange = (name, index) => {
      updateActiveName(name)
      emit('update:modelValue', name)
      emit('change', name, index)
    }

    /**
     * 滚动到第index个
     */
    function scrollToIndex(index: number) {
      bodyRef.value?.scrollToIndex(index)
    }

    /**
     * 滚动到指定name
     */
    function scrollTo(name: string) {
      bodyRef.value?.scrollTo(name)
    }

    const resetContainer: ResetContainer = containSelector => {
      sideRef.value?.resetContainer(containSelector)
      bodyRef.value?.resetContainer(containSelector)
    }

    const onResetItems: StickyViewOnResetItems = items => {
      tabList.value = items.map(item => {
        return {
          value: item.name,
          label: item.title || item.name
        }
      })
    }

    watch(
      () => props.modelValue,
      val => updateActiveName(val)
    )

    onMounted(() => {
      resetContainer(document.documentElement)
      updateActiveName(props.modelValue)
      if (activeName.value == null && tabList.value.length > 0) {
        // 首次要写入一个
        activeName.value = tabList.value[0].value
      }
    })

    expose({
      scrollTo,
      scrollToIndex,
      resetContainer
    })

    return {
      sideRef,
      bodyRef,
      activeName,
      tabList,
      onTabChange,
      onStickyViewChange,
      onResetItems,

      scrollTo,
      scrollToIndex,
      resetContainer
    }
  }
})
</script>
