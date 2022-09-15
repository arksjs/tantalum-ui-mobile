# Dropdown 下拉框

<CodeDemo name="Dropdown">

<<< @/../../demo/src/components/Basic/Dropdown/index.vue

</CodeDemo>

## Import

```js
import { AkDropdown } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { VisibleState, PopupOnVisibleStateChange } from 'arkui-mobile-vue'
```

## Props

| 属性            | 类型                  | 默认值 | 必填 | 说明                                                                              |
| --------------- | --------------------- | ------ | ---- | --------------------------------------------------------------------------------- |
| v-model:visible | boolean               | false  | 否   | 是否显示                                                                          |
| selector        | string \| HTMLElement |        | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |

## Events

| 事件                 | 描述           | 回调函数参数                                                          | TypeScript 函数           |
| -------------------- | -------------- | --------------------------------------------------------------------- | ------------------------- |
| visible-state-change | 展示隐藏时触发 | payload: { state: [VisibleState](./Dropdown.md#visiblestate-值说明) } | PopupOnVisibleStateChange |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## Slots

```vue
<ak-dropdown>
  展开的内容
</ak-dropdown>
```
