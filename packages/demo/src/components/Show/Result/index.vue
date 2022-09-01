<template>
  <fx-group title="基础用法">
    <fx-result
      type="info"
      title="标题"
      description="内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现。"
    ></fx-result>
  </fx-group>
  <fx-group title="type=success & showBack=false">
    <fx-result
      type="success"
      title="支付成功"
      description="内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现。"
      :showBack="false"
    ></fx-result>
  </fx-group>
  <fx-group title="type=warning & 自定义按钮文案">
    <fx-result
      type="warning"
      title="遇到问题"
      description="内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现。"
      confirmText="自定义确定"
      backText="自定义返回"
    ></fx-result>
  </fx-group>
  <fx-group title="type=fail & Slot default">
    <fx-result
      type="fail"
      title="支付失败"
      description="内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现。"
    >
      <div class="exp-result-extra">
        在这里可以附加组件元素或者相应的提示文案，样式自定。
      </div>
    </fx-result>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpResult'
})
</script>
