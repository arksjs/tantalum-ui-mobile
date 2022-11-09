<template>
  <ta-group title="基础用法">
    <ta-tab-view
      class="exp-tabView"
      v-model="value"
      @change="onChange"
      ref="tabViewRef"
    >
      <ta-tab-view-item name="Tab 1">
        <ta-scroll-view
          class="exp-tabView-scroll-view"
          :enable-pull-directions="['down']"
          scroll-y
          scroll-x
          @refreshing="onRefreshing"
        >
          <ta-empty
            class="exp-tabView-empty"
            description="Tab 1 下拉刷新"
          ></ta-empty>
        </ta-scroll-view>
      </ta-tab-view-item>
      <ta-tab-view-item name="Tab 2">
        <ta-empty class="exp-tabView-empty" description="Tab 2"></ta-empty
      ></ta-tab-view-item>
    </ta-tab-view>
  </ta-group>
  <ta-group title="垂直">
    <ta-tab-view
      class="exp-tabView"
      :initialVertical="true"
      :scrollThreshold="1"
    >
      <ta-tab-view-item name="Tab 1">
        <ta-scroll-view
          class="exp-tabView-scroll-view"
          :enable-pull-directions="['down']"
          scroll-y
          @refreshing="onRefreshing"
        >
          <ta-empty
            class="exp-tabView-empty"
            description="Tab 1 下拉刷新"
          ></ta-empty>
        </ta-scroll-view>
      </ta-tab-view-item>
      <ta-tab-view-item name="Tab 2">
        <ta-empty class="exp-tabView-empty" description="Tab 2"></ta-empty>
      </ta-tab-view-item>
    </ta-tab-view>
  </ta-group>
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
