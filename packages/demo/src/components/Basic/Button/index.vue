<template>
  <ta-group title="标准 & 渐变 & 实线 & 虚线 & 无边框">
    <ul class="exp-button-group">
      <li>
        <ta-button type="default">默认</ta-button>
        <ta-button type="primary">主要</ta-button>
        <ta-button type="success">成功</ta-button>
        <ta-button type="warning">警告</ta-button>
        <ta-button type="danger">危险</ta-button>
      </li>
      <li>
        <ta-button type="default" pattern="gradient">默认</ta-button>
        <ta-button type="primary" pattern="gradient">主要</ta-button>
        <ta-button type="success" pattern="gradient">成功</ta-button>
        <ta-button type="warning" pattern="gradient">警告</ta-button>
        <ta-button type="danger" pattern="gradient">危险</ta-button>
      </li>
      <li>
        <ta-button type="default" pattern="solid">默认</ta-button>
        <ta-button type="primary" pattern="solid">主要</ta-button>
        <ta-button type="success" pattern="solid">成功</ta-button>
        <ta-button type="warning" pattern="solid">警告</ta-button>
        <ta-button type="danger" pattern="solid">危险</ta-button>
      </li>
      <li>
        <ta-button type="default" pattern="dashed">默认</ta-button>
        <ta-button type="primary" pattern="dashed">主要</ta-button>
        <ta-button type="success" pattern="dashed">成功</ta-button>
        <ta-button type="warning" pattern="dashed">警告</ta-button>
        <ta-button type="danger" pattern="dashed">危险</ta-button>
      </li>
      <li>
        <ta-button type="default" pattern="borderless">默认</ta-button>
        <ta-button type="primary" pattern="borderless">主要</ta-button>
        <ta-button type="success" pattern="borderless">成功</ta-button>
        <ta-button type="warning" pattern="borderless">警告</ta-button>
        <ta-button type="danger" pattern="borderless">危险</ta-button>
      </li>
    </ul>
  </ta-group>
  <ta-group title="幽灵按钮">
    <ul class="exp-button-group" style="background: #000">
      <li>
        <ta-button type="default" ghost>默认</ta-button>
      </li>
      <li>
        <ta-button type="primary" ghost>主要</ta-button>
        <ta-button type="success" ghost>成功</ta-button>
        <ta-button type="warning" ghost>警告</ta-button>
        <ta-button type="danger" ghost>危险</ta-button>
      </li>
    </ul>
  </ta-group>
  <ta-group title="自定义颜色（长春花色#6667AB/莲花色#E2C0BF）">
    <ul class="exp-button-group">
      <li>
        <ta-button color="#6667AB">深色</ta-button>
        <ta-button color="#6667AB" pattern="gradient">渐变</ta-button>
        <ta-button color="#E2C0BF">浅色</ta-button>
      </li>
      <li>
        <ta-button color="#6667AB" pattern="solid">实线</ta-button>
        <ta-button color="#6667AB" pattern="dashed">虚线</ta-button>
        <ta-button color="#6667AB" pattern="borderless">无边框</ta-button>
      </li>
    </ul>
  </ta-group>
  <ta-group title="禁用">
    <ul class="exp-button-group">
      <li>
        <ta-button type="default" disabled>默认</ta-button>
        <ta-button type="primary" pattern="solid" disabled>实线</ta-button>
        <ta-button type="primary" pattern="dashed" disabled>虚线</ta-button>
      </li>
      <li>
        <ta-button type="primary" disabled>主要</ta-button>
        <ta-button type="success" disabled>成功</ta-button>
        <ta-button type="warning" disabled>警告</ta-button>
        <ta-button type="danger" disabled>危险</ta-button>
      </li>
    </ul>
  </ta-group>
  <ta-group title="附带图标">
    <ul class="exp-button-group">
      <li>
        <ta-button type="danger" shape="square" icon="HeartOutlined">
        </ta-button>
        <ta-button
          type="primary"
          pattern="solid"
          shape="square"
          icon="EditOutlined"
        >
        </ta-button>
        <ta-button
          type="success"
          pattern="dashed"
          shape="square"
          icon="CheckOutlined"
        >
        </ta-button>
        <ta-button type="danger" icon="SearchOutlined">搜索</ta-button>
      </li>
      <li>
        <ta-button type="primary" shape="circle" icon="SearchOutlined">
        </ta-button>
        <ta-button
          type="success"
          pattern="solid"
          shape="circle"
          icon="EditOutlined"
        >
        </ta-button>
        <ta-button
          type="danger"
          pattern="dashed"
          shape="circle"
          icon="CheckOutlined"
        >
        </ta-button>
        <ta-button type="default" loading shape="round">加载中</ta-button>
      </li>
    </ul>
  </ta-group>
  <ta-group title="large 尺寸">
    <ul class="exp-button-group">
      <li>
        <ta-button
          type="danger"
          size="large"
          shape="circle"
          icon="HeartOutlined"
        >
        </ta-button>
        <ta-button type="danger" size="large" disabled>危险</ta-button>
        <ta-button type="default" size="large" loading shape="round"
          >加载中</ta-button
        >
      </li>
      <li>
        <ta-button
          type="warning"
          size="large"
          shape="square"
          icon="BorderOutlined"
        >
        </ta-button>
        <ta-button
          type="primary"
          size="large"
          pattern="solid"
          icon="PlusOutlined"
          >主要</ta-button
        >
        <ta-button type="success" size="large" pattern="dashed">成功</ta-button>
        <ta-button type="danger" size="large" pattern="borderless"
          >危险</ta-button
        >
      </li>
    </ul>
  </ta-group>
  <ta-group title="small 尺寸">
    <ul class="exp-button-group">
      <li>
        <ta-button
          type="danger"
          size="small"
          shape="circle"
          icon="HeartOutlined"
        >
        </ta-button>
        <ta-button type="danger" size="small" disabled>危险</ta-button>
        <ta-button type="default" size="small" loading shape="round"
          >加载中</ta-button
        >
      </li>
      <li>
        <ta-button
          type="warning"
          size="small"
          shape="square"
          icon="SearchOutlined"
        >
        </ta-button>
        <ta-button
          type="primary"
          size="small"
          pattern="solid"
          icon="PlusOutlined"
          >主要</ta-button
        >
        <ta-button type="success" size="small" pattern="dashed">成功</ta-button>
        <ta-button type="danger" size="small" pattern="borderless"
          >危险</ta-button
        >
      </li>
    </ul>
  </ta-group>
  <ta-group title="group 组合">
    <ul class="exp-button-group">
      <li>
        <ta-button-group shape="square" size="small">
          <ta-button type="default" icon="LeftOutlined"></ta-button>
          <ta-button type="default" icon="HomeOutlined"></ta-button>
        </ta-button-group>
        <ta-button-group size="small">
          <ta-button type="default" icon="LeftOutlined">返回</ta-button>
          <ta-button type="default" icon="HomeOutlined">首页</ta-button>
        </ta-button-group>
      </li>
      <li>
        <ta-button-group shape="square" size="middle">
          <ta-button type="default" icon="LeftOutlined"></ta-button>
          <ta-button type="default" icon="HomeOutlined"></ta-button>
        </ta-button-group>
        <ta-button-group size="middle">
          <ta-button type="default" icon="LeftOutlined">返回</ta-button>
          <ta-button type="default" icon="HomeOutlined">首页</ta-button>
        </ta-button-group>
      </li>
      <li>
        <ta-button-group shape="square" size="large">
          <ta-button type="default" icon="LeftOutlined"></ta-button>
          <ta-button type="default" icon="HomeOutlined"></ta-button>
        </ta-button-group>
        <ta-button-group size="large">
          <ta-button type="default" icon="LeftOutlined">返回</ta-button>
          <ta-button type="default" icon="HomeOutlined">首页</ta-button>
        </ta-button-group>
      </li>
      <li>
        <ta-button-group shape="circle" size="small">
          <ta-button type="default" icon="LeftOutlined"></ta-button>
          <ta-button type="default" icon="HomeOutlined"></ta-button>
        </ta-button-group>
        <ta-button-group shape="round" size="small">
          <ta-button type="default" icon="LeftOutlined">返回</ta-button>
          <ta-button type="default" icon="HomeOutlined">首页</ta-button>
        </ta-button-group>
      </li>
      <li>
        <ta-button-group shape="circle" size="middle">
          <ta-button type="default" icon="LeftOutlined"></ta-button>
          <ta-button type="default" icon="HomeOutlined"></ta-button>
        </ta-button-group>
        <ta-button-group shape="round" size="middle">
          <ta-button type="default" icon="LeftOutlined">返回</ta-button>
          <ta-button type="default" icon="HomeOutlined">首页</ta-button>
        </ta-button-group>
      </li>
      <li>
        <ta-button-group shape="circle" size="large">
          <ta-button type="default" icon="LeftOutlined"></ta-button>
          <ta-button type="default" icon="HomeOutlined"></ta-button>
        </ta-button-group>
        <ta-button-group shape="round" size="large">
          <ta-button type="default" icon="LeftOutlined">返回</ta-button>
          <ta-button type="default" icon="HomeOutlined">首页</ta-button>
        </ta-button-group>
      </li>
      <li>
        <ta-button-group :shape="shape" pattern="solid">
          <ta-button
            type="primary"
            shape="round"
            icon="LeftOutlined"
          ></ta-button>
          <ta-button type="primary" icon="HomeOutlined"></ta-button>
        </ta-button-group>
        <ta-button-group shape="round" pattern="gradient">
          <ta-button type="warning">加购物车</ta-button>
          <ta-button type="danger">立即购买</ta-button>
        </ta-button-group>
      </li>
    </ul>
  </ta-group>
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
