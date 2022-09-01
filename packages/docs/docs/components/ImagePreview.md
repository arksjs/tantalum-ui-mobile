# ImagePreview 图片预览

<CodeDemo name="ImagePreview">

<<< @/../../demo/src/components/Show/ImagePreview/index.vue

</CodeDemo>

## Import

```js
import { ImagePreview } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  ImagePreviewOnChange,
  VisibleState,
  PopupOnVisibleStateChange,
  PopupOnCancel
} from 'vfox'
```

## Props

| 属性                 | 类型     | 默认值 | 必填 | 说明                                   |
| -------------------- | -------- | ------ | ---- | -------------------------------------- |
| v-model:visible      | boolean  | false  | 否   | 是否显示                               |
| v-model:current      | string   |        | 否   | 指定当前显示的图片 url                 |
| urls                 | string[] |        | 否   | 图片 url 数组                          |
| show-close           | boolean  | false  | 否   | 是否显示关闭按钮，显示按钮后展示头部栏 |
| navigation-buttons   | boolean  | false  | 否   | 是否展示上一页/下一页按钮              |
| image-high-rendering | boolean  | true   | 否   | 高清渲染，开启后图片按物理分辨率展示   |

## Events

| 事件                 | 描述           | 回调函数参数                                                                  | TypeScript 函数           |
| -------------------- | -------------- | ----------------------------------------------------------------------------- | ------------------------- |
| change               | 图片切换后触发 | ( current: string, activeIndex: number, fromIndex: number )                   | ImagePreviewOnChange      |
| cancel               | 关闭时触发     | ( payload: { source: string } )                                               | PopupOnCancel             |
| visible-state-change | 展示隐藏时触发 | ( payload: { state: [VisibleState](./ImagePreview.md#visiblestate-值说明) } ) | PopupOnVisibleStateChange |

### change 的回调参数

| 参数        | 类型   | 描述           |
| ----------- | ------ | -------------- |
| current     | string | 当前图片的 url |
| activeIndex | number | 当前图片的索引 |
| fromIndex   | number | 上涨图片的索引 |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## showImagePreview(object)

预览图片。

### object

| 属性               | 类型                                   | 默认值 | 必填 | 说明                                                                     |
| ------------------ | -------------------------------------- | ------ | ---- | ------------------------------------------------------------------------ |
| urls               | string[]                               |        | 是   | 图片地址数组                                                             |
| current            | string                                 |        | 否   | 默认显示的图片地址                                                       |
| showClose          | boolean                                | false  | 否   | 是否显示关闭按钮，显示按钮后展示头部栏                                   |
| navigationButtons  | boolean                                | false  | 否   | 是否展示上一页/下一页按钮                                                |
| imageHighRendering | boolean                                | true   | 否   | 高清渲染，开启后图片按物理分辨率展示                                     |
| success            | (payload: { cancel: boolean }) => void |        | 否   | 接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数             |
| fail               | (e: Error) => void                     |        | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出） |
| complete           | () => void                             |        | 否   | 弹窗关闭或调用失败的回调函数                                             |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showImagePreview({
  urls: [
    'https://cdn.fox2.cn/vfox/empty/default@2x.png',
    'https://cdn.fox2.cn/vfox/empty/network@2x.png'
  ],
  current: 'https://cdn.fox2.cn/vfox/empty/network@2x.png'
})
```
