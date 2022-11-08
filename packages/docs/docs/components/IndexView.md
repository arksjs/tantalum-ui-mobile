# IndexView/IndexViewItem 索引栏

<CodeDemo name="IndexView">

<<< @/../../demo/src/components/Navigation/IndexView/index.vue

</CodeDemo>

## Import

```js
import { TaIndexView, TaIndexViewItem } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { IndexViewOnChange, IndexViewRef } from 'tantalum-ui-mobile'
```

## IndexView Props

| 属性              | 类型             | 默认值 | 必填 | 说明                        |
| ----------------- | ---------------- | ------ | ---- | --------------------------- |
| sticky-offset-top | string \| number | 0      | 否   | 数值默认是 px，也支持 vw/vh |

## IndexView Events

| 事件   | 描述       | 回调函数参数                        | TypeScript 函数   |
| ------ | ---------- | ----------------------------------- | ----------------- |
| change | 切换时触发 | (name: string, activeIndex: number) | IndexViewOnChange |

## Methods

```ts
interface IndexViewRef {
  scrollTo: (name: string) => void
  scrollToIndex: (index: number) => void
}
```

| 方法名        | 说明                     |
| ------------- | ------------------------ |
| scrollTo      | 切换到指定 name 的 Item  |
| scrollToIndex | 切换到指定 index 的 Item |

## IndexView Slots

### #default

注：其中只可放置 [IndexViewItem](./IndexView.md#indexviewitem-索引子项) 组件，否则会导致未定义的行为。

```vue
<ta-index-view>
  <ta-index-view-item name="A">
    <ta-cell label="单元格"></ta-cell>
    <ta-cell label="单元格"></ta-cell>
    <ta-cell label="单元格"></ta-cell>
  </ta-index-view-item>
  ...
</ta-index-view>
```

## IndexViewItem Props

| 属性  | 类型   | 默认值 | 必填 | 说明                                                               |
| ----- | ------ | ------ | ---- | ------------------------------------------------------------------ |
| name  | string |        | 是   | 唯一标识，设置后配合 ScrollTab 组件的 `v-model` 和 `onChange` 使用 |
| title | string |        | 否   | 分组名，也应用于吸附侧边栏，如果没有设置则获取 `name` 的值         |

## IndexViewItem Slots

### #default

```vue
<ta-index-view-item name="A">
  <ta-cell label="单元格"></ta-cell>
  <ta-cell label="单元格"></ta-cell>
  <ta-cell label="单元格"></ta-cell>
  ...
</ta-index-view-item>
```
