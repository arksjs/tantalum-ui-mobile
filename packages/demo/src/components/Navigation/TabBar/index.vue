<template>
  <ta-group title="基础用法">
    <ta-tab-bar :options="baseList" v-model="activeValue" ref="tabBarRef" />
  </ta-group>
  <ta-group title="徽标">
    <ta-tab-bar :options="badgeList" />
  </ta-group>
  <ta-group title="自定义图标">
    <ta-tab-bar :options="customIconList" />
  </ta-group>
  <ta-group title="自定义颜色">
    <ta-tab-bar
      color="#8B8DB8"
      activeColor="#ffffff"
      style="background-color: #6667ab"
      :options="baseList"
    />
  </ta-group>
  <ta-group title="自定义图片（icon=URL）">
    <ta-tab-bar class="exp-tabBar-custom" :options="imageList" />
  </ta-group>
  <ta-group title="配合 Fixed 实现置底">
    <ta-fixed>
      <ta-tab-bar
        :options="baseList"
        v-model="activeValue"
        class="exp-tabBar-w"
        @change="onChange"
      />
    </ta-fixed>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, markRaw, ref } from 'vue'
import { baseList, badgeList, imageList } from './data'
import { showToast, type TabBarOnChange } from '@/index'
import TaobaoSvg from '../../../assets/icons/taobao.svg?vueComponent'
import QqSvg from '../../../assets/icons/qq.svg?vueComponent'
import WechatSvg from '../../../assets/icons/wechat.svg?vueComponent'
import WeiboSvg from '../../../assets/icons/weibo.svg?vueComponent'

const customIconList = [
  {
    value: 'wechat',
    label: '微信',
    icon: markRaw(WechatSvg)
  },
  {
    value: 'qq',
    label: 'QQ',
    icon: markRaw(QqSvg)
  },
  {
    value: 'weibo',
    label: '微博',
    icon: markRaw(WeiboSvg)
  },
  {
    value: 'taobao',
    label: '淘宝',
    icon: markRaw(TaobaoSvg)
  }
]

export default defineComponent({
  name: 'ExpTabBar',
  setup() {
    const onChange: TabBarOnChange = (value, index) => {
      console.log('change', value, index)
      showToast(`切换到第${index + 1}个`)
    }

    const activeValue = ref(0)
    const tabBarRef = ref()

    return {
      tabBarRef,
      activeValue,
      customIconList,
      baseList,
      badgeList,
      imageList,
      onChange
    }
  }
})
</script>
