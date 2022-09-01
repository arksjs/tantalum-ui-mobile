# Drawer 抽屉

用于在屏幕边缘显示应用导航等内容的面板。

<CodeDemo name="Drawer">

<<< @/../../demo/src/components/Basic/Drawer/index.vue

</CodeDemo>

## Import

```js
import { Drawer } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  VisibleState,
  PopupOnVisibleStateChange,
  PopupOnCancel
} from 'vfox'
```

## Props

| 属性            | 类型          | 默认值   | 必填 | 说明                                               |
| --------------- | ------------- | -------- | ---- | -------------------------------------------------- |
| v-model:visible | boolean       | false    | 否   | 是否显示                                           |
| title           | string        |          | 否   | 标题，设置标题后展示头部栏                         |
| placement       | PlacementType | 'bottom' | 否   | 从哪展开，可选值：'bottom', 'top', 'left', 'right' |
| show-close      | boolean       | false    | 否   | 是否显示关闭按钮，显示按钮后展示头部栏             |

## Events

| 事件                 | 描述                           | 回调函数参数                                                        | TypeScript 函数           |
| -------------------- | ------------------------------ | ------------------------------------------------------------------- | ------------------------- |
| visible-state-change | 展示隐藏时触发                 | payload: { state: [VisibleState](./Drawer.md#visiblestate-值说明) } | PopupOnVisibleStateChange |
| cancel               | 关闭按钮或者点击蒙层关闭时触发 | payload: { source: string }                                         | PopupOnCancel             |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## Slots

```vue
<fx-drawer title="菜单" placement="right">
  内容
</fx-drawer>
```
