<template>
  <fx-group title="基础用法">
    <fx-cell label="默认">
      <fx-price price="1234.56" />
    </fx-cell>
    <fx-cell label="设置符号">
      <fx-price price="1234.56" symbol="￥" />
    </fx-cell>
    <fx-cell label="千分位">
      <fx-price price="1234.56" thousands />
    </fx-cell>
    <fx-cell label="保留3位小数">
      <fx-price price="1234.56" :decimalDigits="3" />
    </fx-cell>
  </fx-group>
  <fx-group title="设置样式">
    <fx-cell label="自定义颜色">
      <fx-price
        class="exp-price-custom-color"
        price="1234.56"
        symbol="￥"
        thousands
      />
    </fx-cell>
    <fx-cell label="自定义大小">
      <fx-price
        class="exp-price-custom-size"
        price="1234.56"
        symbol="￥"
        thousands
      />
    </fx-cell>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpPrice'
})
</script>
