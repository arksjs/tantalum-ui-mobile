# Popover 气泡

<CodeDemo name="Popover">

<<< @/../../demo/src/components/Basic/Popover/index.vue

</CodeDemo>

## Import

```js
import { TaPopover } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  VisibleState,
  PopupOnVisibleStateChange
} from 'tantalum-ui-mobile'
```

## Props

| 属性            | 类型                  | 默认值   | 必填 | 说明                                                                              |
| --------------- | --------------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| v-model:visible | boolean               | false    | 否   | 是否显示                                                                          |
| selector        | string \| HTMLElement |          | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| placement       | PlacementType         | 'bottom' | 否   | 展开位置，可选 'bottom', 'top', 'left', 'right'                                   |
| show-mask       | boolean               | true     | 否   | 是否展示蒙层，如果设置不展示，气泡则是跟随 `selector` 对应的元素                  |
| content         | string                |          | 否   | 展示文本，如设置了 `slot`，则不使用该字段                                         |

## Events

| 事件                 | 描述           | 回调函数参数                                                         | TypeScript 函数           |
| -------------------- | -------------- | -------------------------------------------------------------------- | ------------------------- |
| visible-state-change | 展示隐藏时触发 | payload: { state: [VisibleState](./Popover.md#visiblestate-值说明) } | PopupOnVisibleStateChange |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## Slots

### #default

```vue
<ta-popover>自定义内容</ta-popover>
```

## showPopover(object)

显示气泡。

### object

| 属性      | 类型                  | 默认值   | 必填 | 说明                                                                              |
| --------- | --------------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| selector  | string \| HTMLElement |          | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| placement | PlacementType         | 'bottom' | 否   | 展开位置，可选 'bottom', 'top', 'left', 'right'                                   |
| content   | string                |          | 是   | 文本内容                                                                          |
| showMask  | boolean               | true     | 否   | 是否展示蒙层，如果设置不展示，气泡则是跟随 `selector` 对应的元素                  |
| success   | () => void            |          | 否   | 接口调用成功的回调函数                                                            |
| fail      | (e: Error) => void    |          | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出）                              |
| complete  | () => void            |          | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                                  |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showPopover({
  selector: '#popoverTarget',
  content: '这是气泡内容',
  success: res => {
    console.log('success', res)
  }
})
```
