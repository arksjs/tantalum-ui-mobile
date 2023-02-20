# Price 价格

美化的价格展现组件。

<CodeDemo name="Price">

<<< @/../../demo/src/components/Show/Price/index.vue

</CodeDemo>

## Import

```js
import { TaPrice } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性           | 类型             | 默认值 | 必填 | 说明                                   |
| -------------- | ---------------- | ------ | ---- | -------------------------------------- |
| price          | string \| number |        | 是   | 金额，如：'1234.56'                    |
| symbol         | string           |        | 否   | 显示货币货号：如：'￥'                 |
| thousands      | boolean          | false  | 否   | 是否以千分号的形式显示，如：'1,234.56' |
| decimal-digits | number \| string | 2      | 否   | 保留 `decimalDigits` 小数位数          |
