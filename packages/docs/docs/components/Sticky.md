# Sticky/StickyView/StickyViewItem 粘性布局

<CodeDemo name="Sticky">

<<< @/../../demo/src/components/Navigation/Sticky/index.vue

</CodeDemo>

## Import

```js
import { TaSticky, TaStickyView, TaStickyViewItem } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { StickyViewOnChange, StickyViewRef } from 'tantalum-ui-mobile'
```

## Sticky

粘性容器。

### Sticky Props

| 属性             | 类型                              | 默认值   | 必填 | 说明                                                                            |
| ---------------- | --------------------------------- | -------- | ---- | ------------------------------------------------------------------------------- |
| contain-selector | string \| HTMLElement \| Document | document | 否   | 基于哪个容器，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| offset-top       | string \| number                  | 0        | 否   | 数值默认是 px，也支持 vw/vh                                                     |
| offset-bottom    | string \| number                  | 0        | 否   | 数值默认是 px，也支持 vw/vh                                                     |

### Sticky Slots

#### #default

```vue
<ta-sticky>自定义内容</ta-sticky>
```

## StickyView

粘性布局。

### StickyView Props

| 属性             | 类型                              | 默认值   | 必填 | 说明                                                                            |
| ---------------- | --------------------------------- | -------- | ---- | ------------------------------------------------------------------------------- |
| v-model          | string                            | 0        | 否   | 当前布局中展现的子项 name 值                                                    |
| contain-selector | string \| HTMLElement \| Document | document | 否   | 基于哪个容器，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| offset-top       | string \| number                  | 0        | 否   | 数值默认是 px，也支持 vw/vh                                                     |

### StickyView Events

| 事件   | 描述       | 回调函数参数                        | TypeScript 函数    |
| ------ | ---------- | ----------------------------------- | ------------------ |
| change | 切换时触发 | (name: string, activeIndex: number) | StickyViewOnChange |

### StickyView Slots

#### #default

注：其中只可放置 [StickyViewItem](./Sticky.md#stickyviewitem) 组件，否则会导致未定义的行为。

```vue
<ta-sticky-view>
  <ta-sticky-view-item name="Sticky 1">
    <div class="sticky-box-1"></div>
  </ta-sticky-view-item>
  <ta-sticky-view-item name="Sticky 1">
    <div class="sticky-box-1"></div>
  </ta-sticky-view-item>
  <ta-sticky-view-item name="Sticky 2">
    <div class="sticky-box-2"></div>
  </ta-sticky-view-item>
  <ta-sticky-view-item name="Sticky 3">
    <div class="sticky-box-3"></div>
  </ta-sticky-view-item>
  <ta-sticky-view-item name="Sticky 4">
    <div class="sticky-box-4"></div>
  </ta-sticky-view-item>
</ta-sticky-view>
```

### Methods

```ts
interface StickyViewRef {
  scrollTo: (name: string) => void
  scrollToIndex: (index: number) => void
  scrollToOffset: (offset: number) => void
}
```

| 方法名         | 说明                      |
| -------------- | ------------------------- |
| scrollTo       | 切换到指定 name 的 Item   |
| scrollToIndex  | 切换到指定 index 的 Item  |
| scrollToOffset | 切换到指定位置（单位 px） |

## StickyViewItem

### StickyViewItem Props

| 属性  | 类型   | 默认值 | 必填 | 说明                                                             |
| ----- | ------ | ------ | ---- | ---------------------------------------------------------------- |
| name  | string |        | 是   | 唯一标识，设置后配合 ScrollTab 组件的 `v-model` 和 `change` 使用 |
| title | string |        | 否   | 分组名，也应用于吸附，如果没有设置则获取 `name` 的值             |

### StickyViewItem Slots

#### #default

```vue
<ta-sticky-view-item name="Sticky 1">
  <div class="sticky-box-1"></div>
</ta-sticky-view-item>
```
