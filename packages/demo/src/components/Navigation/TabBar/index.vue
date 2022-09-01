<template>
  <fx-group title="基础用法">
    <fx-tab-bar :options="baseList" v-model:activeValue="activeValue" />
  </fx-group>
  <fx-group title="徽标">
    <fx-tab-bar :options="badgeList" />
  </fx-group>
  <fx-group title="自定义图标">
    <fx-tab-bar :options="customIconList" />
  </fx-group>
  <fx-group title="自定义颜色">
    <fx-tab-bar
      color="#8B8DB8"
      activeColor="#ffffff"
      style="background-color: #6667ab"
      :options="baseList"
    />
  </fx-group>
  <fx-group title="自定义图片（icon=URL）">
    <fx-tab-bar class="exp-tabBar-custom" :options="imageList" />
  </fx-group>
  <fx-group title="配合 Fixed 实现置底">
    <fx-fixed>
      <fx-tab-bar :options="baseList" v-model:activeValue="activeValue" />
    </fx-fixed>
  </fx-group>
</template>

<script lang="ts">
import { baseList, badgeList, imageList } from './data'
import { defineComponent, markRaw } from 'vue'
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
  data() {
    return {
      activeValue: 1,
      customIconList,
      baseList,
      badgeList,
      imageList
    }
  }
})
</script>
