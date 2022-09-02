# Toast 轻提示

<CodeDemo name="Toast">

<<< @/../../demo/src/components/Feedback/Toast/index.vue

</CodeDemo>

## Import

```js
import { FxToast } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  ToastType,
  VisibleState,
  PopupOnVisibleStateChange
} from 'arkui-mobile-vue'
```

## Props

| 属性            | 类型      | 默认值    | 必填 | 说明                                                                              |
| --------------- | --------- | --------- | ---- | --------------------------------------------------------------------------------- |
| v-model:visible | boolean   | false     | 否   | 是否显示                                                                          |
| title           | string    |           | 是   | 提示的内容                                                                        |
| type            | ToastType | 'default' | 否   | 类型，'default'无图标, 可选 'success', 'loading', 'fail'                          |
| image           | string    |           | 否   | 图标，优先级高于 type 自带的图标                                                  |
| show-mask       | boolean   | false     | 否   | 是否显示透明蒙层，防止触摸穿透                                                    |
| duration        | number    | 0         | 否   | visible=true 展示后，duration 毫秒后消失，0 为不消失，在 `v-model:visible` 下生效 |

### ToastType 的合法值

| 值      | 说明                                               |
| ------- | -------------------------------------------------- |
| default | 不显示图标，此时 title 文本最多可显示两行          |
| success | 显示成功图标，此时 title 文本最多显示 7 个汉字长度 |
| loading | 显示加载图标，此时 title 文本最多显示 7 个汉字长度 |
| fail    | 显示错误图标，此时 title 文本最多显示 7 个汉字长度 |

## Events

| 事件                 | 描述           | 回调函数参数                                                       | TypeScript 函数           |
| -------------------- | -------------- | ------------------------------------------------------------------ | ------------------------- |
| visible-state-change | 展示隐藏时触发 | payload: { state: [VisibleState](./Toast.md#visiblestate-值说明) } | PopupOnVisibleStateChange |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## showToast(object)

显示消息提示框。

注：Toast 接口目前仅支持单例模式。

### object

| 属性     | 类型                                       | 默认值    | 必填 | 说明                                                             |
| -------- | ------------------------------------------ | --------- | ---- | ---------------------------------------------------------------- |
| title    | string                                     |           | 是   | 提示的内容                                                       |
| type     | [ToastType](./Toast.md#toasttype-的合法值) | 'default' | 否   | 类型，可选 'success', 'loading', 'fail'                          |
| icon     | string                                     |           | 否   | 图标，使用 [Icon](../components/Icon.md) 组件，优先级高于 `type` |
| duration | number                                     | 1500      | 否   | 提示的延迟关闭时间                                               |
| showMask | boolean                                    | false     | 否   | 是否显示透明蒙层，防止触摸穿透                                   |
| success  | () => void                                 |           | 否   | 接口调用成功的回调函数                                           |
| fail     | (e: Error) => void                         |           | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出）             |
| complete | () => void                                 |           | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                 |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showToast({
  title: '成功',
  type: 'success',
  duration: 2000
})
```

## hideToast([object])

隐藏消息提示框。

### object

| 属性     | 类型               | 默认值 | 必填 | 说明                                                 |
| -------- | ------------------ | ------ | ---- | ---------------------------------------------------- |
| success  | () => void         |        | 否   | 接口调用成功的回调函数                               |
| fail     | (e: Error) => void |        | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出） |
| complete | () => void         |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）     |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
hideToast()
```

## showLoading(object)

显示 loading 提示框。需主动调用 [hideLoading](./Toast.md#toast-hideloading-object) 才能关闭提示框。

### object

| 属性     | 类型               | 默认值 | 必填 | 说明                                                 |
| -------- | ------------------ | ------ | ---- | ---------------------------------------------------- |
| title    | string             |        | 是   | 提示的内容                                           |
| showMask | boolean            | false  | 否   | 是否显示透明蒙层，防止触摸穿透                       |
| success  | () => void         |        | 否   | 接口调用成功的回调函数                               |
| fail     | (e: Error) => void |        | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出） |
| complete | () => void         |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）     |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showLoading({
  title: '加载中'
})
```

## hideLoading([object])

隐藏 loading 提示框。

### object

| 属性     | 类型               | 默认值 | 必填 | 说明                                                 |
| -------- | ------------------ | ------ | ---- | ---------------------------------------------------- |
| success  | () => void         |        | 否   | 接口调用成功的回调函数                               |
| fail     | (e: Error) => void |        | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出） |
| complete | () => void         |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）     |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
hideLoading()
```
