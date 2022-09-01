# NoticeBar 通告栏

<CodeDemo name="NoticeBar">

<<< @/../../demo/src/components/Show/NoticeBar/index.vue

</CodeDemo>

## Import

```js
import { NoticeBar } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { NoticeBarMode } from 'vfox'
```

## Props

| 属性       | 类型                | 默认值    | 必填 | 说明                                                                                            |
| ---------- | ------------------- | --------- | ---- | ----------------------------------------------------------------------------------------------- |
| mode       | NoticeBarMode       | 'default' | 否   | 通知栏模式                                                                                      |
| left-icon  | string \| Component |           | 否   | 设置左侧图标，使用 [Icon](./Icon.md) 组件                                                       |
| right-icon | string \| Component |           | 否   | 设置右侧图标，使用 [Icon](./Icon.md) 组件，设置后会覆盖指定 `mode` 模式下的图标                 |
| color      | string              |           | 否   | 自定义色彩，支持 hex rgb hsl 等写法，详细效果[查看](../design/color.md#自定义色彩)              |
| marquee    | boolean             | false     | 否   | 是否启用跑马灯展示方式，开启后只展示 1 行，只要长度溢出就会滚动播放，关闭后长度溢出则会换行显示 |

### NoticeBarMode 的合法值

| 值        | 说明                       |
| --------- | -------------------------- |
| default   | 默认                       |
| clickable | 展示右箭头图标，表示可点击 |
| closable  | 展示关闭图标，点击可关闭   |

## Events

| 事件        | 描述                                  | 回调函数参数      | TypeScript 函数 |
| ----------- | ------------------------------------- | ----------------- | --------------- |
| close-click | `closable` 模式下，关闭按钮点击时触发 | ( e: MouseEvent ) |                 |
| click       | `closable` 模式下，通告栏点击时触发   | ( e: MouseEvent ) |                 |
