<template>
  <ak-group title="基础用法">
    <div class="exp-icon-flex">
      <ak-row :gutter="[16, 16]">
        <ak-col :span="6">
          <ak-icon class="exp-icon-icon" icon="UpOutlined"></ak-icon>
          <span class="exp-icon-text">UpOutlined</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon class="exp-icon-icon" icon="DownOutlined"></ak-icon>
          <span class="exp-icon-text">DownOutlined</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon class="exp-icon-icon" icon="LeftOutlined"></ak-icon>
          <span class="exp-icon-text">LeftOutlined</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon class="exp-icon-icon" icon="RightOutlined"></ak-icon>
          <span class="exp-icon-text">RightOutlined</span>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
  <ak-group title="大小">
    <div class="exp-icon-flex">
      <ak-row :gutter="[16, 16]" align="bottom">
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon"
            size="16"
            icon="CheckCircleOutlined"
          ></ak-icon>
          <span class="exp-icon-text">16px</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon"
            size="24"
            icon="CheckCircleOutlined"
          ></ak-icon>
          <span class="exp-icon-text">24px</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon"
            size="32"
            icon="CheckCircleOutlined"
          ></ak-icon>
          <span class="exp-icon-text">32px</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon"
            size="40"
            icon="CheckCircleOutlined"
          ></ak-icon>
          <span class="exp-icon-text">40px</span>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
  <ak-group title="颜色">
    <div class="exp-icon-flex">
      <ak-row :gutter="[16, 16]" align="bottom">
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon color-primary"
            icon="CheckCircleOutlined"
          ></ak-icon>
          <span class="exp-icon-text">蓝色</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon color-success"
            icon="CheckCircleOutlined"
          ></ak-icon>
          <span class="exp-icon-text">绿色</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon color-warning"
            icon="CheckCircleOutlined"
          ></ak-icon>
          <span class="exp-icon-text">橙色</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon color-danger"
            icon="CheckCircleOutlined"
          ></ak-icon>
          <span class="exp-icon-text">红色</span>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
  <ak-group title="颜色">
    <div class="exp-icon-flex">
      <ak-row :gutter="[16, 16]" align="bottom">
        <ak-col :span="6">
          <ak-icon class="exp-icon-icon color-primary" :icon="QqSvg"></ak-icon>
          <span class="exp-icon-text">QQ</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon color-success"
            :icon="WechatSvg"
          ></ak-icon>
          <span class="exp-icon-text">微信</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon color-warning"
            :icon="TaobaoSvg"
          ></ak-icon>
          <span class="exp-icon-text">淘宝</span>
        </ak-col>
        <ak-col :span="6">
          <ak-icon
            class="exp-icon-icon color-danger"
            :icon="WeiboSvg"
          ></ak-icon>
          <span class="exp-icon-text">微博</span>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
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
