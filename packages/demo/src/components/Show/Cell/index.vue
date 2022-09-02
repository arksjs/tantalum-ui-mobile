<template>
  <ak-group title="基础用法">
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容" description="描述信息"></ak-cell>
  </ak-group>
  <ak-group title="包含图标">
    <ak-cell label="单元格" content="内容" icon="EditOutlined"></ak-cell>
    <ak-cell
      label="单元格"
      content="内容"
      description="描述信息"
      icon="EditOutlined"
    ></ak-cell>
  </ak-group>
  <ak-group title="展示箭头">
    <ak-cell label="单元格" isLink></ak-cell>
    <ak-cell
      label="单元格"
      content="内容"
      isLink
      arrow-direction="down"
    ></ak-cell>
    <ak-cell
      label="单元格"
      content="内容"
      isLink
      arrow-direction="left"
    ></ak-cell>
    <ak-cell
      label="单元格"
      description="描述信息"
      isLink
      arrow-direction="up"
    ></ak-cell>
    <ak-cell
      label="单元格"
      content="内容"
      description="描述信息"
      isLink
    ></ak-cell>
  </ak-group>
  <ak-group title="其他">
    <ak-cell
      label="必填"
      content="内容"
      isLink
      arrow-direction="down"
      required
    ></ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell
      label="单元格"
      content="内容"
      description="描述信息"
      isLink
      @click="showToast('点击事件')"
    ></ak-cell>
  </ak-group>
  <ak-group title="Slot default">
    <ak-cell label="右侧图标" content="内容">
      <ak-icon icon="CloseOutlined"></ak-icon>
    </ak-cell>
    <ak-cell>
      <div class="exp-cell-user-item">
        <ak-image
          class="exp-cell-user-item-avatar"
          src="https://cdn.fox2.cn/vfox/swiper/center-2.jpg"
          mode="aspectFill"
        />
        <span class="exp-cell-user-item-nickname">小明</span>
      </div>
    </ak-cell>
  </ak-group>
  <ak-group title="Slot icon">
    <ak-cell>
      <div class="exp-cell-user-item">
        <ak-image
          class="exp-cell-user-item-avatar"
          src="https://cdn.fox2.cn/vfox/swiper/center-2.jpg"
          mode="aspectFill"
        />
        <span class="exp-cell-user-item-nickname">小明</span>
      </div>
      <template #icon>
        <ak-checkbox circle @change="onCheckboxChange" />
      </template>
    </ak-cell>
  </ak-group>
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
