<template>
  <div class="ta-price">
    <slot></slot>
    <span class="ta-price_symbol" v-if="symbol">{{ symbol }}</span>
    <span class="ta-price_integer">{{ priceStr.split('.')[0] }}</span>
    <span class="ta-price_decimal" v-if="hasDecimal">.{{ priceStr.split('.')[1] }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { getNumber, isNumeric } from '../helpers'
import { getPrice } from './util'

export default defineComponent({
  name: 'ta-price',
  props: {
    // 金额
    price: {
      type: [Number, String],
      validator: isNumeric,
      default: 0,
      required: true
    },
    // 货币符号
    symbol: {
      type: String
    },
    // 是否千分位展示
    thousands: {
      type: Boolean,
      default: false
    },
    // 小数位数
    decimalDigits: {
      type: [Number, String],
      default: 2
    }
  },
  setup(props) {
    const priceStr = computed(() => getPrice(props))
    const hasDecimal = computed(() => getNumber(props.decimalDigits) > 0)

    return {
      hasDecimal,
      priceStr
    }
  }
})
</script>
