<template>
  <ak-group title="基础用法">
    <ak-tab-bar :options="baseList" v-model:activeValue="activeValue" />
  </ak-group>
  <ak-group title="徽标">
    <ak-tab-bar :options="badgeList" />
  </ak-group>
  <ak-group title="自定义图标">
    <ak-tab-bar :options="customIconList" />
  </ak-group>
  <ak-group title="自定义颜色">
    <ak-tab-bar
      color="#8B8DB8"
      activeColor="#ffffff"
      style="background-color: #6667ab"
      :options="baseList"
    />
  </ak-group>
  <ak-group title="自定义图片（icon=URL）">
    <ak-tab-bar class="exp-tabBar-custom" :options="imageList" />
  </ak-group>
  <ak-group title="配合 Fixed 实现置底">
    <ak-fixed>
      <ak-tab-bar
        :options="baseList"
        v-model:activeValue="activeValue"
        class="exp-tabBar-w"
      />
    </ak-fixed>
  </ak-group>
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
