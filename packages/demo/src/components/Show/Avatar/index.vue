<template>
  <ak-group title="基础用法">
    <ak-cell label="默认">
      <ak-avatar />
    </ak-cell>
    <ak-cell label="图片（src=xxx）">
      <ak-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
    </ak-cell>
    <ak-cell label="文字（Slot default）">
      <ak-avatar>曹</ak-avatar>
    </ak-cell>
  </ak-group>
  <ak-group title="色彩（color）">
    <div class="exp-avatar-custom-list">
      <ak-avatar color="#ff4d4f">DR</ak-avatar>
      <ak-avatar color="#ff7a45">V</ak-avatar>
      <ak-avatar color="#fa8c16">SO</ak-avatar>
      <ak-avatar color="#faad14">CG</ak-avatar>
      <ak-avatar color="#fadb14">SY</ak-avatar>
      <ak-avatar color="#597ef7">GB</ak-avatar>
      <ak-avatar color="#1890ff">DB</ak-avatar>
      <ak-avatar color="#36cfc9">C</ak-avatar>
      <ak-avatar color="#52c41a">PG</ak-avatar>
      <ak-avatar color="#a0d911">L</ak-avatar>
      <ak-avatar color="#9254de">GP</ak-avatar>
      <ak-avatar color="#f759ab">M</ak-avatar>
    </div>
  </ak-group>
  <ak-group title="形状（shape）">
    <ak-cell label="circle">
      <ak-avatar shape="circle" />
    </ak-cell>
    <ak-cell label="square">
      <ak-avatar shape="square" />
    </ak-cell>
  </ak-group>
  <ak-group title="尺寸（size）">
    <div class="exp-avatar-custom-list">
      <ak-avatar :size="24">24</ak-avatar>
      <ak-avatar size="small">SM</ak-avatar>
      <ak-avatar size="middle">MD</ak-avatar>
      <ak-avatar size="large">LG</ak-avatar>
    </div>
  </ak-group>
  <ak-group title="角标">
    <ak-cell label="gender">
      <div class="exp-avatar-list">
        <ak-avatar
          shape="square"
          gender="man"
          src="https://cdn.fox2.cn/vfox/avatar/1.png"
        />
        <ak-avatar
          shape="square"
          gender="woman"
          src="https://cdn.fox2.cn/vfox/avatar/2.png"
        />
        <ak-avatar
          shape="circle"
          gender="man"
          src="https://cdn.fox2.cn/vfox/avatar/3.png"
        />
        <ak-avatar
          shape="circle"
          gender="woman"
          src="https://cdn.fox2.cn/vfox/avatar/4.png"
        />
      </div>
    </ak-cell>
    <ak-cell label="badge">
      <div class="exp-avatar-list">
        <ak-avatar shape="square" badge="99" />
        <ak-avatar shape="square" :badge="{ content: 1, dot: true }" />
      </div>
    </ak-cell>
  </ak-group>
  <ak-group title="头像组">
    <ak-cell label="size=small">
      <ak-avatar-group size="small">
        <ak-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
        <ak-avatar src="https://cdn.fox2.cn/vfox/avatar/6.png" />
        <ak-avatar src="https://cdn.fox2.cn/vfox/avatar/7.png" />
      </ak-avatar-group>
    </ak-cell>
    <ak-cell label="totalCount=123456">
      <ak-avatar-group size="small" :totalCount="123456" countColor="#6667AB">
        <ak-avatar src="https://cdn.fox2.cn/vfox/avatar/1.png" />
        <ak-avatar src="https://cdn.fox2.cn/vfox/avatar/2.png" />
        <ak-avatar src="https://cdn.fox2.cn/vfox/avatar/3.png" />
        <ak-avatar src="https://cdn.fox2.cn/vfox/avatar/4.png" />
      </ak-avatar-group>
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpAvatar'
})
</script>
