<template>
  <ak-group title="标准 & 渐变 & 实线 & 虚线 & 无边框">
    <ul class="exp-button-group">
      <li>
        <ak-button type="default">默认</ak-button>
        <ak-button type="primary">主要</ak-button>
        <ak-button type="success">成功</ak-button>
        <ak-button type="warning">警告</ak-button>
        <ak-button type="danger">危险</ak-button>
      </li>
      <li>
        <ak-button type="default" pattern="gradient">默认</ak-button>
        <ak-button type="primary" pattern="gradient">主要</ak-button>
        <ak-button type="success" pattern="gradient">成功</ak-button>
        <ak-button type="warning" pattern="gradient">警告</ak-button>
        <ak-button type="danger" pattern="gradient">危险</ak-button>
      </li>
      <li>
        <ak-button type="default" pattern="solid">默认</ak-button>
        <ak-button type="primary" pattern="solid">主要</ak-button>
        <ak-button type="success" pattern="solid">成功</ak-button>
        <ak-button type="warning" pattern="solid">警告</ak-button>
        <ak-button type="danger" pattern="solid">危险</ak-button>
      </li>
      <li>
        <ak-button type="default" pattern="dashed">默认</ak-button>
        <ak-button type="primary" pattern="dashed">主要</ak-button>
        <ak-button type="success" pattern="dashed">成功</ak-button>
        <ak-button type="warning" pattern="dashed">警告</ak-button>
        <ak-button type="danger" pattern="dashed">危险</ak-button>
      </li>
      <li>
        <ak-button type="default" pattern="borderless">默认</ak-button>
        <ak-button type="primary" pattern="borderless">主要</ak-button>
        <ak-button type="success" pattern="borderless">成功</ak-button>
        <ak-button type="warning" pattern="borderless">警告</ak-button>
        <ak-button type="danger" pattern="borderless">危险</ak-button>
      </li>
    </ul>
  </ak-group>
  <ak-group title="幽灵按钮">
    <ul class="exp-button-group" style="background: #000">
      <li>
        <ak-button type="default" ghost>默认</ak-button>
      </li>
      <li>
        <ak-button type="primary" ghost>主要</ak-button>
        <ak-button type="success" ghost>成功</ak-button>
        <ak-button type="warning" ghost>警告</ak-button>
        <ak-button type="danger" ghost>危险</ak-button>
      </li>
    </ul>
  </ak-group>
  <ak-group title="自定义颜色（长春花色#6667AB/莲花色#E2C0BF）">
    <ul class="exp-button-group">
      <li>
        <ak-button color="#6667AB">深色</ak-button>
        <ak-button color="#6667AB" pattern="gradient">渐变</ak-button>
        <ak-button color="#E2C0BF">浅色</ak-button>
      </li>
      <li>
        <ak-button color="#6667AB" pattern="solid">实线</ak-button>
        <ak-button color="#6667AB" pattern="dashed">虚线</ak-button>
        <ak-button color="#6667AB" pattern="borderless">无边框</ak-button>
      </li>
    </ul>
  </ak-group>
  <ak-group title="禁用">
    <ul class="exp-button-group">
      <li>
        <ak-button type="default" disabled>默认</ak-button>
        <ak-button type="primary" pattern="solid" disabled>实线</ak-button>
        <ak-button type="primary" pattern="dashed" disabled>虚线</ak-button>
      </li>
      <li>
        <ak-button type="primary" disabled>主要</ak-button>
        <ak-button type="success" disabled>成功</ak-button>
        <ak-button type="warning" disabled>警告</ak-button>
        <ak-button type="danger" disabled>危险</ak-button>
      </li>
    </ul>
  </ak-group>
  <ak-group title="附带图标">
    <ul class="exp-button-group">
      <li>
        <ak-button type="danger" shape="square" icon="HeartOutlined">
        </ak-button>
        <ak-button
          type="primary"
          pattern="solid"
          shape="square"
          icon="EditOutlined"
        >
        </ak-button>
        <ak-button
          type="success"
          pattern="dashed"
          shape="square"
          icon="CheckOutlined"
        >
        </ak-button>
        <ak-button type="danger" icon="SearchOutlined"> </ak-button>
      </li>
      <li>
        <ak-button type="primary" shape="circle" icon="SearchOutlined">
        </ak-button>
        <ak-button
          type="success"
          pattern="solid"
          shape="circle"
          icon="EditOutlined"
        >
        </ak-button>
        <ak-button
          type="danger"
          pattern="dashed"
          shape="circle"
          icon="CheckOutlined"
        >
        </ak-button>
        <ak-button type="default" loading shape="round">加载中</ak-button>
      </li>
    </ul>
  </ak-group>
  <ak-group title="middle 尺寸">
    <ul class="exp-button-group">
      <li>
        <ak-button
          type="danger"
          size="middle"
          shape="circle"
          icon="HeartOutlined"
        >
        </ak-button>
        <ak-button type="danger" size="middle" disabled>危险</ak-button>
        <ak-button type="default" size="middle" loading shape="round"
          >加载中</ak-button
        >
      </li>
      <li>
        <ak-button
          type="warning"
          size="middle"
          shape="square"
          icon="BorderOutlined"
        >
        </ak-button>
        <ak-button
          type="primary"
          size="middle"
          pattern="solid"
          icon="PlusOutlined"
          >主要</ak-button
        >
        <ak-button type="success" size="middle" pattern="dashed"
          >成功</ak-button
        >
        <ak-button type="danger" size="middle" pattern="borderless"
          >危险</ak-button
        >
      </li>
    </ul>
  </ak-group>
  <ak-group title="small 尺寸">
    <ul class="exp-button-group">
      <li>
        <ak-button
          type="danger"
          size="small"
          shape="circle"
          icon="HeartOutlined"
        >
        </ak-button>
        <ak-button type="danger" size="small" disabled>危险</ak-button>
        <ak-button type="default" size="small" loading shape="round"
          >加载中</ak-button
        >
      </li>
      <li>
        <ak-button
          type="warning"
          size="small"
          shape="square"
          icon="SearchOutlined"
        >
        </ak-button>
        <ak-button
          type="primary"
          size="small"
          pattern="solid"
          icon="PlusOutlined"
          >主要</ak-button
        >
        <ak-button type="success" size="small" pattern="dashed">成功</ak-button>
        <ak-button type="danger" size="small" pattern="borderless"
          >危险</ak-button
        >
      </li>
    </ul>
  </ak-group>
  <ak-group title="group 组合">
    <ul class="exp-button-group">
      <li>
        <ak-button-group shape="square" size="small">
          <ak-button type="default" icon="LeftOutlined"></ak-button>
          <ak-button type="default" icon="HomeOutlined"></ak-button>
        </ak-button-group>
        <ak-button-group size="small">
          <ak-button type="default" icon="LeftOutlined">返回</ak-button>
          <ak-button type="default" icon="HomeOutlined">首页</ak-button>
        </ak-button-group>
      </li>
      <li>
        <ak-button-group shape="square" size="large">
          <ak-button type="default" icon="LeftOutlined"></ak-button>
          <ak-button type="default" icon="HomeOutlined"></ak-button>
        </ak-button-group>
        <ak-button-group size="large">
          <ak-button type="default" icon="LeftOutlined">返回</ak-button>
          <ak-button type="default" icon="HomeOutlined">首页</ak-button>
        </ak-button-group>
      </li>
      <li>
        <ak-button-group shape="circle" size="small">
          <ak-button type="default" icon="LeftOutlined"></ak-button>
          <ak-button type="default" icon="HomeOutlined"></ak-button>
        </ak-button-group>
        <ak-button-group shape="round" size="small">
          <ak-button type="default" icon="LeftOutlined">返回</ak-button>
          <ak-button type="default" icon="HomeOutlined">首页</ak-button>
        </ak-button-group>
      </li>
      <li>
        <ak-button-group shape="circle" size="large">
          <ak-button type="default" icon="LeftOutlined"></ak-button>
          <ak-button type="default" icon="HomeOutlined"></ak-button>
        </ak-button-group>
        <ak-button-group shape="round" size="large">
          <ak-button type="default" icon="LeftOutlined">返回</ak-button>
          <ak-button type="default" icon="HomeOutlined">首页</ak-button>
        </ak-button-group>
      </li>
      <li>
        <ak-button-group :shape="shape" pattern="solid">
          <ak-button
            type="primary"
            shape="round"
            icon="LeftOutlined"
          ></ak-button>
          <ak-button type="primary" icon="HomeOutlined"></ak-button>
        </ak-button-group>
        <ak-button-group shape="round" pattern="gradient">
          <ak-button type="warning">加购物车</ak-button>
          <ak-button type="danger">立即购买</ak-button>
        </ak-button-group>
      </li>
    </ul>
  </ak-group>
</template>

<script lang="ts">
import type { ButtonShape } from '@/index'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpButton',
  data() {
    return {
      shape: 'circle' as ButtonShape
    }
  }
})
</script>
