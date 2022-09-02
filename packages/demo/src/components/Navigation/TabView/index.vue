<template>
  <ak-group title="基础用法">
    <ak-tab-view class="exp-tabView">
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
