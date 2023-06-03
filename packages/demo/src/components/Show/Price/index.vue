<template>
  <ta-group title="基础用法">
    <ta-cell label="默认">
      <ta-price price="1234.56" />
    </ta-cell>
    <ta-cell label="设置符号">
      <ta-price price="1234.56" symbol="￥" />
    </ta-cell>
    <ta-cell label="千分位">
      <ta-price price="1234.56" thousands />
    </ta-cell>
    <ta-cell label="保留3位小数">
      <ta-price price="1234.56" :decimalDigits="3" />
    </ta-cell>
  </ta-group>
  <ta-group title="设置样式">
    <ta-cell label="自定义颜色">
      <ta-price class="exp-price-custom-color" price="1234.56" symbol="￥" thousands />
    </ta-cell>
    <ta-cell label="自定义大小">
      <ta-price class="exp-price-custom-size" price="1234.56" symbol="￥" thousands />
    </ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpPrice'
})
</script>
