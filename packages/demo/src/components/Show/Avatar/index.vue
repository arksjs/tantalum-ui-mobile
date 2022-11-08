<template>
  <ta-group title="基础用法">
    <ta-cell label="默认">
      <ta-avatar />
    </ta-cell>
    <ta-cell label="图片（src=xxx）">
      <ta-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
    </ta-cell>
    <ta-cell label="文字（Slot default）">
      <ta-avatar>曹</ta-avatar>
    </ta-cell>
  </ta-group>
  <ta-group title="色彩（color）">
    <div class="exp-avatar-custom-list">
      <ta-avatar color="#ff4d4f">DR</ta-avatar>
      <ta-avatar color="#ff7a45">V</ta-avatar>
      <ta-avatar color="#fa8c16">SO</ta-avatar>
      <ta-avatar color="#faad14">CG</ta-avatar>
      <ta-avatar color="#fadb14">SY</ta-avatar>
      <ta-avatar color="#597ef7">GB</ta-avatar>
      <ta-avatar color="#1890ff">DB</ta-avatar>
      <ta-avatar color="#36cfc9">C</ta-avatar>
      <ta-avatar color="#52c41a">PG</ta-avatar>
      <ta-avatar color="#a0d911">L</ta-avatar>
      <ta-avatar color="#9254de">GP</ta-avatar>
      <ta-avatar color="#f759ab">M</ta-avatar>
    </div>
  </ta-group>
  <ta-group title="形状（shape）">
    <ta-cell label="circle">
      <ta-avatar shape="circle" />
    </ta-cell>
    <ta-cell label="square">
      <ta-avatar shape="square" />
    </ta-cell>
  </ta-group>
  <ta-group title="尺寸（size）">
    <div class="exp-avatar-custom-list">
      <ta-avatar :size="24">24</ta-avatar>
      <ta-avatar size="small">SM</ta-avatar>
      <ta-avatar size="middle">MD</ta-avatar>
      <ta-avatar size="large">LG</ta-avatar>
    </div>
  </ta-group>
  <ta-group title="角标">
    <ta-cell label="gender">
      <div class="exp-avatar-list">
        <ta-avatar
          shape="square"
          gender="man"
          src="https://cdn.fox2.cn/vfox/avatar/1.png"
        />
        <ta-avatar
          shape="square"
          gender="woman"
          src="https://cdn.fox2.cn/vfox/avatar/2.png"
        />
        <ta-avatar
          shape="circle"
          gender="man"
          src="https://cdn.fox2.cn/vfox/avatar/3.png"
        />
        <ta-avatar
          shape="circle"
          gender="woman"
          src="https://cdn.fox2.cn/vfox/avatar/4.png"
        />
      </div>
    </ta-cell>
    <ta-cell label="badge">
      <div class="exp-avatar-list">
        <ta-avatar shape="square" badge="99" />
        <ta-avatar shape="square" :badge="{ content: 1, dot: true }" />
      </div>
    </ta-cell>
  </ta-group>
  <ta-group title="头像组">
    <ta-cell label="size=small">
      <ta-avatar-group size="small">
        <ta-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
        <ta-avatar src="https://cdn.fox2.cn/vfox/avatar/6.png" />
        <ta-avatar src="https://cdn.fox2.cn/vfox/avatar/7.png" />
      </ta-avatar-group>
    </ta-cell>
    <ta-cell label="totalCount=123456">
      <ta-avatar-group size="small" :totalCount="123456" countColor="#6667AB">
        <ta-avatar src="https://cdn.fox2.cn/vfox/avatar/1.png" />
        <ta-avatar src="https://cdn.fox2.cn/vfox/avatar/2.png" />
        <ta-avatar src="https://cdn.fox2.cn/vfox/avatar/3.png" />
        <ta-avatar src="https://cdn.fox2.cn/vfox/avatar/4.png" />
      </ta-avatar-group>
    </ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpAvatar'
})
</script>
