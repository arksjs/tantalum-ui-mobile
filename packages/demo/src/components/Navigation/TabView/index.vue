<template>
  <ak-group title="基础用法">
    <ak-tab-view
      class="exp-tabView"
      v-model="value"
      @change="onChange"
      ref="tabViewRef"
    >
      <ak-tab-view-item name="Tab 1">
        <ak-scroll-view
          class="exp-tabView-scroll-view"
          :enable-pull-directions="['down']"
          scroll-y
          scroll-x
          @refreshing="onRefreshing"
        >
          <ak-empty
            class="exp-tabView-empty"
            description="Tab 1 下拉刷新"
          ></ak-empty>
        </ak-scroll-view>
      </ak-tab-view-item>
      <ak-tab-view-item name="Tab 2">
        <ak-empty class="exp-tabView-empty" description="Tab 2"></ak-empty
      ></ak-tab-view-item>
    </ak-tab-view>
  </ak-group>
  <ak-group title="垂直">
    <ak-tab-view
      class="exp-tabView"
      :initialVertical="true"
      :scrollThreshold="1"
    >
      <ak-tab-view-item name="Tab 1">
        <ak-scroll-view
          class="exp-tabView-scroll-view"
          :enable-pull-directions="['down']"
          scroll-y
          @refreshing="onRefreshing"
        >
          <ak-empty
            class="exp-tabView-empty"
            description="Tab 1 下拉刷新"
          ></ak-empty>
        </ak-scroll-view>
      </ak-tab-view-item>
      <ak-tab-view-item name="Tab 2">
        <ak-empty class="exp-tabView-empty" description="Tab 2"></ak-empty>
      </ak-tab-view-item>
    </ak-tab-view>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef } from 'vue'
import type {
  ScrollViewOnRefreshing,
  TabViewOnChange,
  TabViewRef
} from '@/index'

export default defineComponent({
  name: 'ExpTabView',
  setup() {
    const tabViewRef = shallowRef<TabViewRef | null>(null)
    const value = ref('')

    const onRefreshing: ScrollViewOnRefreshing = (res, done) => {
      setTimeout(() => {
        done()
      }, 2000)
    }

    const onChange: TabViewOnChange = (name, index) => {
      console.log('change', name, index)
    }

    onMounted(() => {
      // tabViewRef.value?.switchTo(0)
    })

    return {
      tabViewRef,
      value,
      onRefreshing,
      onChange
    }
  }
})
</script>
