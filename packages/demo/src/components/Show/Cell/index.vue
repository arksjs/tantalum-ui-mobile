<template>
  <fx-group title="基础用法">
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容" description="描述信息"></fx-cell>
  </fx-group>
  <fx-group title="包含图标">
    <fx-cell label="单元格" content="内容" icon="EditOutlined"></fx-cell>
    <fx-cell
      label="单元格"
      content="内容"
      description="描述信息"
      icon="EditOutlined"
    ></fx-cell>
  </fx-group>
  <fx-group title="展示箭头">
    <fx-cell label="单元格" isLink></fx-cell>
    <fx-cell
      label="单元格"
      content="内容"
      isLink
      arrow-direction="down"
    ></fx-cell>
    <fx-cell
      label="单元格"
      content="内容"
      isLink
      arrow-direction="left"
    ></fx-cell>
    <fx-cell
      label="单元格"
      description="描述信息"
      isLink
      arrow-direction="up"
    ></fx-cell>
    <fx-cell
      label="单元格"
      content="内容"
      description="描述信息"
      isLink
    ></fx-cell>
  </fx-group>
  <fx-group title="其他">
    <fx-cell
      label="必填"
      content="内容"
      isLink
      arrow-direction="down"
      required
    ></fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell
      label="单元格"
      content="内容"
      description="描述信息"
      isLink
      @click="showToast('点击事件')"
    ></fx-cell>
  </fx-group>
  <fx-group title="Slot default">
    <fx-cell label="右侧图标" content="内容">
      <fx-icon icon="CloseOutlined"></fx-icon>
    </fx-cell>
    <fx-cell>
      <div class="exp-cell-user-item">
        <fx-image
          class="exp-cell-user-item-avatar"
          src="https://cdn.fox2.cn/vfox/swiper/center-2.jpg"
          mode="aspectFill"
        />
        <span class="exp-cell-user-item-nickname">小明</span>
      </div>
    </fx-cell>
  </fx-group>
  <fx-group title="Slot icon">
    <fx-cell>
      <div class="exp-cell-user-item">
        <fx-image
          class="exp-cell-user-item-avatar"
          src="https://cdn.fox2.cn/vfox/swiper/center-2.jpg"
          mode="aspectFill"
        />
        <span class="exp-cell-user-item-nickname">小明</span>
      </div>
      <template #icon>
        <fx-checkbox circle @change="onCheckboxChange" />
      </template>
    </fx-cell>
  </fx-group>
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
