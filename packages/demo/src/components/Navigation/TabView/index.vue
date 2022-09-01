<template>
  <fx-group title="基础用法">
    <fx-tab-view class="exp-tabView">
      <fx-tab-view-item name="Tab 1">
        <fx-scroll-view
          class="exp-tabView-scroll-view"
          :enable-pull-directions="['down']"
          scroll-y
          scroll-x
          @refreshing="onRefreshing"
        >
          <fx-empty
            class="exp-tabView-empty"
            description="Tab 1 下拉刷新"
          ></fx-empty>
        </fx-scroll-view>
      </fx-tab-view-item>
      <fx-tab-view-item name="Tab 2">
        <fx-empty class="exp-tabView-empty" description="Tab 2"></fx-empty
      ></fx-tab-view-item>
    </fx-tab-view>
  </fx-group>
  <fx-group title="垂直">
    <fx-tab-view
      class="exp-tabView"
      :initialVertical="true"
      :scrollThreshold="1"
    >
      <fx-tab-view-item name="Tab 1">
        <fx-scroll-view
          class="exp-tabView-scroll-view"
          :enable-pull-directions="['down']"
          scroll-y
          @refreshing="onRefreshing"
        >
          <fx-empty
            class="exp-tabView-empty"
            description="Tab 1 下拉刷新"
          ></fx-empty>
        </fx-scroll-view>
      </fx-tab-view-item>
      <fx-tab-view-item name="Tab 2">
        <fx-empty class="exp-tabView-empty" description="Tab 2"></fx-empty>
      </fx-tab-view-item>
    </fx-tab-view>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ScrollViewOnRefreshing } from '@/index'

export default defineComponent({
  name: 'ExpTabView',
  setup() {
    const onRefreshing: ScrollViewOnRefreshing = (res, done) => {
      setTimeout(() => {
        done()
      }, 2000)
    }

    return {
      onRefreshing
    }
  }
})
</script>
