<template>
  <ak-group title="基础用法">
    <ak-empty description="暂无内容"></ak-empty>
  </ak-group>
  <ak-group title="其他类型">
    <ak-empty description="出错了" type="error"></ak-empty>
    <ak-empty description="网络错误" type="network"></ak-empty>
    <ak-empty description="搜索不到" type="search"></ak-empty>
  </ak-group>
  <ak-group title="Slot default">
    <ak-empty description="网络错误" type="network">
      <ak-button type="primary" size="small"> 刷新试试 </ak-button>
    </ak-empty>
  </ak-group>
  <ak-group title="Slot image">
    <ak-empty description="网站被小猫咪吃了">
      <template #image>
        <ak-image
          class="exp-empty-custom-image"
          src="https://cdn.fox2.cn/vfox/swiper/different-1.jpg"
        />
      </template>
    </ak-empty>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpEmpty'
})
</script>
