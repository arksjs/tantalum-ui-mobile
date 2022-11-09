<template>
  <ta-group title="基础用法">
    <div class="exp-icon-flex">
      <ta-row :gutter="[16, 16]">
        <ta-col :span="6">
          <ta-icon class="exp-icon-icon" icon="UpOutlined"></ta-icon>
          <span class="exp-icon-text">UpOutlined</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon class="exp-icon-icon" icon="DownOutlined"></ta-icon>
          <span class="exp-icon-text">DownOutlined</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon class="exp-icon-icon" icon="LeftOutlined"></ta-icon>
          <span class="exp-icon-text">LeftOutlined</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon class="exp-icon-icon" icon="RightOutlined"></ta-icon>
          <span class="exp-icon-text">RightOutlined</span>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
  <ta-group title="大小">
    <div class="exp-icon-flex">
      <ta-row :gutter="[16, 16]" align="bottom">
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon"
            size="16"
            icon="CheckCircleOutlined"
          ></ta-icon>
          <span class="exp-icon-text">16px</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon"
            size="24"
            icon="CheckCircleOutlined"
          ></ta-icon>
          <span class="exp-icon-text">24px</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon"
            size="32"
            icon="CheckCircleOutlined"
          ></ta-icon>
          <span class="exp-icon-text">32px</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon"
            size="40"
            icon="CheckCircleOutlined"
          ></ta-icon>
          <span class="exp-icon-text">40px</span>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
  <ta-group title="颜色">
    <div class="exp-icon-flex">
      <ta-row :gutter="[16, 16]" align="bottom">
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon color-primary"
            icon="CheckCircleOutlined"
          ></ta-icon>
          <span class="exp-icon-text">蓝色</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon color-success"
            icon="CheckCircleOutlined"
          ></ta-icon>
          <span class="exp-icon-text">绿色</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon color-warning"
            icon="CheckCircleOutlined"
          ></ta-icon>
          <span class="exp-icon-text">橙色</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon color-danger"
            icon="CheckCircleOutlined"
          ></ta-icon>
          <span class="exp-icon-text">红色</span>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
  <ta-group title="颜色">
    <div class="exp-icon-flex">
      <ta-row :gutter="[16, 16]" align="bottom">
        <ta-col :span="6">
          <ta-icon class="exp-icon-icon color-primary" :icon="QqSvg"></ta-icon>
          <span class="exp-icon-text">QQ</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon color-success"
            :icon="WechatSvg"
          ></ta-icon>
          <span class="exp-icon-text">微信</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon color-warning"
            :icon="TaobaoSvg"
          ></ta-icon>
          <span class="exp-icon-text">淘宝</span>
        </ta-col>
        <ta-col :span="6">
          <ta-icon
            class="exp-icon-icon color-danger"
            :icon="WeiboSvg"
          ></ta-icon>
          <span class="exp-icon-text">微博</span>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
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
