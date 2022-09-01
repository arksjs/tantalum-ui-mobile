<template>
  <fx-group title="基础用法">
    <div class="exp-icon-flex">
      <fx-row :gutter="[16, 16]">
        <fx-col :span="6">
          <fx-icon class="exp-icon-icon" icon="UpOutlined"></fx-icon>
          <span class="exp-icon-text">UpOutlined</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon class="exp-icon-icon" icon="DownOutlined"></fx-icon>
          <span class="exp-icon-text">DownOutlined</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon class="exp-icon-icon" icon="LeftOutlined"></fx-icon>
          <span class="exp-icon-text">LeftOutlined</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon class="exp-icon-icon" icon="RightOutlined"></fx-icon>
          <span class="exp-icon-text">RightOutlined</span>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
  <fx-group title="大小">
    <div class="exp-icon-flex">
      <fx-row :gutter="[16, 16]" align="bottom">
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon"
            size="16"
            icon="CheckCircleOutlined"
          ></fx-icon>
          <span class="exp-icon-text">16px</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon"
            size="24"
            icon="CheckCircleOutlined"
          ></fx-icon>
          <span class="exp-icon-text">24px</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon"
            size="32"
            icon="CheckCircleOutlined"
          ></fx-icon>
          <span class="exp-icon-text">32px</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon"
            size="40"
            icon="CheckCircleOutlined"
          ></fx-icon>
          <span class="exp-icon-text">40px</span>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
  <fx-group title="颜色">
    <div class="exp-icon-flex">
      <fx-row :gutter="[16, 16]" align="bottom">
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon color-primary"
            icon="CheckCircleOutlined"
          ></fx-icon>
          <span class="exp-icon-text">蓝色</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon color-success"
            icon="CheckCircleOutlined"
          ></fx-icon>
          <span class="exp-icon-text">绿色</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon color-warning"
            icon="CheckCircleOutlined"
          ></fx-icon>
          <span class="exp-icon-text">橙色</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon color-danger"
            icon="CheckCircleOutlined"
          ></fx-icon>
          <span class="exp-icon-text">红色</span>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
  <fx-group title="颜色">
    <div class="exp-icon-flex">
      <fx-row :gutter="[16, 16]" align="bottom">
        <fx-col :span="6">
          <fx-icon class="exp-icon-icon color-primary" :icon="QqSvg"></fx-icon>
          <span class="exp-icon-text">QQ</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon color-success"
            :icon="WechatSvg"
          ></fx-icon>
          <span class="exp-icon-text">微信</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon color-warning"
            :icon="TaobaoSvg"
          ></fx-icon>
          <span class="exp-icon-text">淘宝</span>
        </fx-col>
        <fx-col :span="6">
          <fx-icon
            class="exp-icon-icon color-danger"
            :icon="WeiboSvg"
          ></fx-icon>
          <span class="exp-icon-text">微博</span>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'
import TaobaoSvg from '../../../assets/icons/taobao.svg?vueComponent'
import QqSvg from '../../../assets/icons/qq.svg?vueComponent'
import WechatSvg from '../../../assets/icons/wechat.svg?vueComponent'
import WeiboSvg from '../../../assets/icons/weibo.svg?vueComponent'

export default defineComponent({
  name: 'ExpIcon',
  setup() {
    return {
      TaobaoSvg: markRaw(TaobaoSvg),
      QqSvg: markRaw(QqSvg),
      WechatSvg: markRaw(WechatSvg),
      WeiboSvg: markRaw(WeiboSvg)
    }
  }
})
</script>
