# Dialog 模态对话框

<CodeDemo name="Dialog">

<<< @/../../demo/src/components/Feedback/Dialog/index.vue

</CodeDemo>

## Import

```js
import { Dialog } from 'vfox'
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

| 属性            | 类型    | 默认值 | 必填 | 说明                     |
| --------------- | ------- | ------ | ---- | ------------------------ |
| v-model:visible | boolean | false  | 否   | 是否显示                 |
| title           | string  | '提示' | 否   | 提示的标题               |
| content         | string  |        | 否   | 提示的内容，优先于 slot  |
| mask-closable   | boolean | false  | 否   | 点击蒙层是否触发关闭操作 |
| show-cancel     | boolean | true   | 否   | 是否显示取消按钮         |
| confirm-text    | string  | '确定' | 否   | 确认按钮的文字           |
| cancel-text     | string  | '取消' | 否   | 取消按钮的文字           |

## Events

| 事件                 | 描述               | 回调函数参数                                                        | 函数 TypeScript           |
| -------------------- | ------------------ | ------------------------------------------------------------------- | ------------------------- |
| cancel               | 取消按钮点击时触发 | payload: { source: string }                                         | PopupOnCancel             |
| confirm              | 确认按钮点击时触发 |                                                                     |                           |
| visible-state-change | 展示隐藏时触发     | payload: { state: [VisibleState](./Dialog.md#visiblestate-值说明) } | PopupOnVisibleStateChange |

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
<fx-dialog>
  提示内容
  ...
</fx-dialog>
```

## showDialog(object)

显示模态对话框。

### object

| 属性         | 类型                              | 默认值 | 必填 | 说明                                                                     |
| ------------ | --------------------------------- | ------ | ---- | ------------------------------------------------------------------------ |
| title        | string                            |        | 否   | 提示的标题                                                               |
| content      | string                            |        | 是   | 提示的内容                                                               |
| maskClosable | boolean                           | false  | 否   | 点击蒙层是否触发关闭操作                                                 |
| showCancel   | boolean                           | true   | 否   | 是否显示取消按钮                                                         |
| confirmText  | string                            | '确定' | 否   | 确认按钮的文字                                                           |
| cancelText   | string                            | '取消' | 否   | 取消按钮的文字                                                           |
| success      | (payload: SuccessPayload) => void |        | 否   | 接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数             |
| fail         | (e: Error) => void                |        | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出） |
| complete     | () => void                        |        | 否   | 弹窗关闭或调用失败的回调函数                                             |

#### SuccessPayload

| 属性     | 类型    | 说明                               |
| -------- | ------- | ---------------------------------- |
| confirm? | boolean | 为 true 时，表示用户点击了确定按钮 |
| cancel?  | boolean | 为 true 时，表示用户取消了         |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showDialog({
  title: '提示',
  content: '这是一个模态弹窗',
  success(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```
