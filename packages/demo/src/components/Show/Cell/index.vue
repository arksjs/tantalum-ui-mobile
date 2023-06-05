<template>
  <ta-group title="基础用法">
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容" description="描述信息"></ta-cell>
  </ta-group>
  <ta-group title="包含图标">
    <ta-cell label="单元格" content="内容" icon="EditOutlined"></ta-cell>
    <ta-cell label="单元格" content="内容" description="描述信息" icon="EditOutlined"></ta-cell>
  </ta-group>
  <ta-group title="展示箭头">
    <ta-cell label="单元格" isLink></ta-cell>
    <ta-cell label="单元格" content="内容" isLink arrow-direction="down"></ta-cell>
    <ta-cell label="单元格" content="内容" isLink arrow-direction="left"></ta-cell>
    <ta-cell label="单元格" description="描述信息" isLink arrow-direction="up"></ta-cell>
    <ta-cell label="单元格" content="内容" description="描述信息" isLink></ta-cell>
  </ta-group>
  <ta-group title="其他">
    <ta-cell label="必填" content="内容" isLink arrow-direction="down" required></ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell
      label="单元格"
      content="内容"
      description="描述信息"
      isLink
      @click="showToast('点击事件')"
    ></ta-cell>
  </ta-group>
  <ta-group title="Slot default">
    <ta-cell label="右侧图标" content="内容">
      <ta-icon icon="CloseOutlined"></ta-icon>
    </ta-cell>
    <ta-cell>
      <div class="exp-cell-user-item">
        <ta-image
          class="exp-cell-user-item-avatar"
          src="https://cdn.fox2.cn/vfox/swiper/center-2.jpg"
          mode="aspectFill"
        />
        <span class="exp-cell-user-item-nickname">小明</span>
      </div>
    </ta-cell>
  </ta-group>
  <ta-group title="Slot icon">
    <ta-cell>
      <div class="exp-cell-user-item">
        <ta-image
          class="exp-cell-user-item-avatar"
          src="https://cdn.fox2.cn/vfox/swiper/center-2.jpg"
          mode="aspectFill"
        />
        <span class="exp-cell-user-item-nickname">小明</span>
      </div>
      <template #icon>
        <ta-checkbox circle @change="onCheckboxChange" />
      </template>
    </ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpCell',
  setup() {
    const onCheckboxChange = (checked: boolean) => {
      console.log('change', checked)
      showToast(checked ? '勾选' : '取消勾选')
    }

    return {
      showToast,
      onCheckboxChange
    }
  }
})
</script>
