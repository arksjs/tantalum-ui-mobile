# ScrollTab/ScrollTabItem 标签滚动布局

<CodeDemo name="ScrollTab">

<<< @/../../demo/src/components/Navigation/ScrollTab/index.vue

</CodeDemo>

## Import

```js
import { TaScrollTab, TaScrollTabItem } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { ScrollTabOnChange, ScrollTabRef } from 'tantalum-ui-mobile'
```

## ScrollTab

### ScrollTab Props

| 属性                 | 类型             | 默认值 | 必填 | 说明                        |
| -------------------- | ---------------- | ------ | ---- | --------------------------- |
| sticky-offset-top    | string \| number | 0      | 否   | 数值默认是 px，也支持 vw/vh |
| sticky-offset-bottom | string \| number | 0      | 否   | 数值默认是 px，也支持 vw/vh |

### ScrollTab Events

| 事件   | 描述       | 回调函数参数                        | TypeScript 函数   |
| ------ | ---------- | ----------------------------------- | ----------------- |
| change | 切换时触发 | (name: string, activeIndex: number) | ScrollTabOnChange |

### ScrollTab Slots

#### #default

注：其中只可放置 [ScrollTabItem](./ScrollTab.md#scrolltabitem) 组件，否则会导致未定义的行为。

```vue
<ta-scroll-tab>
  <ta-scroll-tab-item name="Dust Red">
    <div class="scroll-tab-box box-1"></div>
  </ta-scroll-tab-item>
  <ta-scroll-tab-item name="Volcano">
    <div class="scroll-tab-box box-2"></div>
  </ta-scroll-tab-item>
  <ta-scroll-tab-item name="Sunset Orange">
    <div class="scroll-tab-box box-3"></div>
  </ta-scroll-tab-item>
  ...
</ta-scroll-tab>
```

### Methods

```ts
interface ScrollTabRef {
  scrollTo: (name: string) => void
  scrollToIndex: (index: number) => void
}
```

| 方法名        | 说明                     |
| ------------- | ------------------------ |
| scrollTo      | 切换到指定 name 的 Item  |
| scrollToIndex | 切换到指定 index 的 Item |

## ScrollTabItem

### ScrollTabItem Props

| 属性  | 类型   | 默认值 | 必填 | 说明                                                             |
| ----- | ------ | ------ | ---- | ---------------------------------------------------------------- |
| name  | string |        | 是   | 唯一标识，设置后配合 ScrollTab 组件的 `v-model` 和 `change` 使用 |
| title | string |        | 否   | 分组名，也应用于吸附，如果没有设置则获取 `name` 的值             |

### ScrollTabItem Slots

#### #default

```vue
<ta-scroll-tab-item name="Dust Red">
  <div class="scroll-tab-box box-1"></div>
</ta-scroll-tab-item>
```
