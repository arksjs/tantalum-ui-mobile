<template>
  <fx-group title="基础用法">
    <fx-empty description="暂无内容"></fx-empty>
  </fx-group>
  <fx-group title="其他类型">
    <fx-empty description="出错了" type="error"></fx-empty>
    <fx-empty description="网络错误" type="network"></fx-empty>
    <fx-empty description="搜索不到" type="search"></fx-empty>
  </fx-group>
  <fx-group title="Slot default">
    <fx-empty description="网络错误" type="network">
      <fx-button type="primary" size="small"> 刷新试试 </fx-button>
    </fx-empty>
  </fx-group>
  <fx-group title="Slot image">
    <fx-empty description="网站被小猫咪吃了">
      <template #image>
        <fx-image
          class="exp-empty-custom-image"
          src="https://cdn.fox2.cn/vfox/swiper/different-1.jpg"
        />
      </template>
    </fx-empty>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpEmpty'
})
</script>
