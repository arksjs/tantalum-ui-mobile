# Modal 模态框

<CodeDemo name="Modal">

<<< @/../../demo/src/components/Basic/Modal/index.vue

</CodeDemo>

## Import

```js
import { TaModal } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { VisibleState, PopupOnVisibleStateChange, PopupOnCancel } from 'tantalum-ui-mobile'
```

## Props

| 属性            | 类型    | 默认值 | 必填 | 说明                          |
| --------------- | ------- | ------ | ---- | ----------------------------- |
| v-model:visible | boolean | false  | 否   | 是否显示                      |
| width           | string  |        | 否   | 模态框的宽度，支持 CSS 宽度值 |
| mask-closable   | boolean | false  | 否   | 点击蒙层是否触发关闭操作      |
| show-close      | boolean | true   | 否   | 是否显示关闭按钮              |

## Events

| 事件                 | 描述                           | 回调函数参数                                                       | TypeScript 函数           |
| -------------------- | ------------------------------ | ------------------------------------------------------------------ | ------------------------- |
| visible-state-change | 展示隐藏时触发                 | payload: { state: [VisibleState](./Modal.md#visiblestate-值说明) } | PopupOnVisibleStateChange |
| cancel               | 关闭按钮或者点击蒙层关闭时触发 | payload: { source: string }                                        | PopupOnCancel             |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |
