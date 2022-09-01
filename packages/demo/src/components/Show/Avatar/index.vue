<template>
  <fx-group title="基础用法">
    <fx-cell label="默认">
      <fx-avatar />
    </fx-cell>
    <fx-cell label="图片（src=xxx）">
      <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
    </fx-cell>
    <fx-cell label="文字（Slot default）">
      <fx-avatar>曹</fx-avatar>
    </fx-cell>
  </fx-group>
  <fx-group title="色彩（color）">
    <div class="exp-avatar-custom-list">
      <fx-avatar color="#ff4d4f">DR</fx-avatar>
      <fx-avatar color="#ff7a45">V</fx-avatar>
      <fx-avatar color="#fa8c16">SO</fx-avatar>
      <fx-avatar color="#faad14">CG</fx-avatar>
      <fx-avatar color="#fadb14">SY</fx-avatar>
      <fx-avatar color="#597ef7">GB</fx-avatar>
      <fx-avatar color="#1890ff">DB</fx-avatar>
      <fx-avatar color="#36cfc9">C</fx-avatar>
      <fx-avatar color="#52c41a">PG</fx-avatar>
      <fx-avatar color="#a0d911">L</fx-avatar>
      <fx-avatar color="#9254de">GP</fx-avatar>
      <fx-avatar color="#f759ab">M</fx-avatar>
    </div>
  </fx-group>
  <fx-group title="形状（shape）">
    <fx-cell label="circle">
      <fx-avatar shape="circle" />
    </fx-cell>
    <fx-cell label="square">
      <fx-avatar shape="square" />
    </fx-cell>
  </fx-group>
  <fx-group title="尺寸（size）">
    <div class="exp-avatar-custom-list">
      <fx-avatar :size="24">24</fx-avatar>
      <fx-avatar size="small">SM</fx-avatar>
      <fx-avatar size="middle">MD</fx-avatar>
      <fx-avatar size="large">LG</fx-avatar>
    </div>
  </fx-group>
  <fx-group title="角标">
    <fx-cell label="gender">
      <div class="exp-avatar-list">
        <fx-avatar
          shape="square"
          gender="man"
          src="https://cdn.fox2.cn/vfox/avatar/1.png"
        />
        <fx-avatar
          shape="square"
          gender="woman"
          src="https://cdn.fox2.cn/vfox/avatar/2.png"
        />
        <fx-avatar
          shape="circle"
          gender="man"
          src="https://cdn.fox2.cn/vfox/avatar/3.png"
        />
        <fx-avatar
          shape="circle"
          gender="woman"
          src="https://cdn.fox2.cn/vfox/avatar/4.png"
        />
      </div>
    </fx-cell>
    <fx-cell label="badge">
      <div class="exp-avatar-list">
        <fx-avatar shape="square" badge="99" />
        <fx-avatar shape="square" :badge="{ content: 1, dot: true }" />
      </div>
    </fx-cell>
  </fx-group>
  <fx-group title="头像组">
    <fx-cell label="size=small">
      <fx-avatar-group size="small">
        <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
        <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/6.png" />
        <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/7.png" />
      </fx-avatar-group>
    </fx-cell>
    <fx-cell label="totalCount=123456">
      <fx-avatar-group size="small" :totalCount="123456" countColor="#6667AB">
        <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/1.png" />
        <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/2.png" />
        <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/3.png" />
        <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/4.png" />
      </fx-avatar-group>
    </fx-cell>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpAvatar'
})
</script>
