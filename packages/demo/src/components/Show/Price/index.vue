<template>
  <ak-group title="基础用法">
    <ak-cell label="默认">
      <ak-price price="1234.56" />
    </ak-cell>
    <ak-cell label="设置符号">
      <ak-price price="1234.56" symbol="￥" />
    </ak-cell>
    <ak-cell label="千分位">
      <ak-price price="1234.56" thousands />
    </ak-cell>
    <ak-cell label="保留3位小数">
      <ak-price price="1234.56" :decimalDigits="3" />
    </ak-cell>
  </ak-group>
  <ak-group title="设置样式">
    <ak-cell label="自定义颜色">
      <ak-price
        class="exp-price-custom-color"
        price="1234.56"
        symbol="￥"
        thousands
      />
    </ak-cell>
    <ak-cell label="自定义大小">
      <ak-price
        class="exp-price-custom-size"
        price="1234.56"
        symbol="￥"
        thousands
      />
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpPrice'
})
</script>
