<template>
  <div class="ak-scroll-tab">
    <div class="ak-scroll-tab_sidebar">
      <Sticky
        ref="sideRef"
        :offsetTop="stickyOffsetTop"
        :offsetBottom="stickyOffsetBottom"
      >
        <SideTab :options="tabList" v-model="activeName" />
      </Sticky>
    </div>
    <div class="ak-scroll-tab_body">
      <StickyView
        :offsetTop="stickyOffsetTop"
        ref="bodyRef"
        v-model="activeName"
        @resetItems="onResetItems"
        @change="onChange"
      >
        <slot></slot>
      </StickyView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { SideTab } from '../SideTab'
import { Sticky } from '../Sticky'
import { StickyView } from '../StickyView'
import { sizeValidator } from '../helpers/validator'
import type { OnResetItems, StickyViewRef } from '../StickyView/types'
import { emitChangeValidator } from '../StickyView/props'
import type { ResetContainer, StickyRef } from '../Sticky/types'
import type { PropsToEmits } from '../helpers/types'
import type { ScrollTabEmits, ScrollTabOnChange } from './types'
import { isString } from '../helpers/util'

export default defineComponent({
  name: 'ak-scroll-tab',
  components: { SideTab, Sticky, StickyView },
  props: {
    modelValue: {
      type: String
    },
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    },
    stickyOffsetBottom: {
      validator: sizeValidator,
      default: 0
    }
  },
  emits: {
    'update:modelValue': name => isString(name),
    change: emitChangeValidator
  } as PropsToEmits<ScrollTabEmits>,
  setup(props, { emit }) {
    const sideRef = ref<StickyRef>()
    const bodyRef = ref<StickyViewRef>()
    const tabList = ref<
      {
        value: string
        label: string
      }[]
    >([])
    const activeName = ref('')

    const resetContainer: ResetContainer = containSelector => {
      sideRef.value?.resetContainer(containSelector)
      bodyRef.value?.resetContainer(containSelector)
    }

    const onResetItems: OnResetItems = items => {
      tabList.value = items.map(item => {
        return {
          value: item.name,
          label: item.title
        }
      })
    }

    const onChange: ScrollTabOnChange = (name, index) => {
      emit('change', name, index)
    }

    /**
     * 滚动到第index个
     * @param index 索引
     */
    function scrollToIndex(index: number) {
      bodyRef.value && bodyRef.value.scrollToIndex(index)
    }

    onMounted(() => resetContainer(document.documentElement))

    return {
      sideRef,
      bodyRef,
      activeName,
      tabList,
      onChange,
      scrollToIndex,
      resetContainer,
      onResetItems
    }
  }
})
</script>
