<template>
  <ta-group title="基础用法">
    <ta-empty description="暂无内容"></ta-empty>
  </ta-group>
  <ta-group title="其他类型">
    <ta-empty description="出错了" type="error"></ta-empty>
    <ta-empty description="网络错误" type="network"></ta-empty>
    <ta-empty description="搜索不到" type="search"></ta-empty>
  </ta-group>
  <ta-group title="Slot default">
    <ta-empty description="网络错误" type="network">
      <ta-button type="primary" size="small"> 刷新试试 </ta-button>
    </ta-empty>
  </ta-group>
  <ta-group title="Slot image">
    <ta-empty description="网站被小猫咪吃了">
      <template #image>
        <ta-image
          class="exp-empty-custom-image"
          src="https://cdn.fox2.cn/vfox/swiper/different-1.jpg"
        />
      </template>
    </ta-empty>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpEmpty'
})
</script>
