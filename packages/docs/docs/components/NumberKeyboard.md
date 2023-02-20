# NumberKeyboard 数字键盘

<CodeDemo name="NumberKeyboard">

<<< @/../../demo/src/components/Form/NumberKeyboard/index.vue

</CodeDemo>

## Import

```js
import { TaNumberKeyboard } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  NumberKeyboardOnDelete,
  NumberKeyboardOnClose,
  NumberKeyboardType,
  VisibleState,
  PopupOnVisibleStateChange
} from 'tantalum-ui-mobile'
```

## Props

| 属性            | 类型               | 默认值    | 必填 | 说明                                                                     |
| --------------- | ------------------ | --------- | ---- | ------------------------------------------------------------------------ |
| v-model:visible | boolean            | false     | 否   | 是否显示                                                                 |
| title           | string             |           | 否   | 标题，不设置则不展示标题栏                                               |
| v-model         | string             |           | 否   | 当前输入值                                                               |
| type            | string             | 'default' | 否   | 键盘模式，可选'default', 'rightColumn'                                   |
| custom-key      | string \| string[] |           | 否   | 'rightColumn' 模式下最多支持添加 2 个，'default' 模式下最多支持添加 1 个 |

## Events

| 事件                 | 描述             | 回调函数参数                                                                | TypeScript 函数           |
| -------------------- | ---------------- | --------------------------------------------------------------------------- | ------------------------- |
| input                | 点击按键时触发   | key: string                                                                 |                           |
| delete               | 点击删除键时触发 | payload: { deleteKey: string }                                              | NumberKeyboardOnDelete    |
| change               | 键盘收回时触发   | value: string                                                               |                           |
| close                | 键盘收回时触发   | payload: { source: 'confirm' \| 'blur' }                                    | NumberKeyboardOnClose     |
| visible-state-change | 展示隐藏时触发   | payload: { state: [VisibleState](./NumberKeyboard.md#visiblestate-值说明) } | PopupOnVisibleStateChange |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |
