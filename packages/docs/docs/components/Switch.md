# Switch 开关选择器

注：

- 支持表单，具体可参考 [Form](./Form.md)。

<CodeDemo name="Switch">

<<< @/../../demo/src/components/Form/Switch/index.vue

</CodeDemo>

## Import

```js
import { TaSwitch } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性         | 类型             | 默认值 | 必填 | 说明                            |
| ------------ | ---------------- | ------ | ---- | ------------------------------- |
| name         | string           |        | 否   | 标识                            |
| disabled     | boolean          | false  | 否   | 是否禁用                        |
| v-model      | boolean          | false  | 否   | 是否开启                        |
| color        | string           |        | 否   | 自定义默认态的背景色            |
| active-color | string           |        | 否   | 自定义激活态的背景色            |
| size         | string \| number |        | 否   | 自定义组件大小（高度），单位 px |

## Events

| 事件   | 描述               | 回调函数参数   |
| ------ | ------------------ | -------------- |
| change | 点击切换状态时触发 | value: boolean |
