# PopDialog 气泡对话框

<CodeDemo name="PopDialog">

<<< @/../../demo/src/components/Feedback/PopDialog/index.vue

</CodeDemo>

## Import

```js
import { TaPopDialog } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { VisibleState, PopupOnVisibleStateChange, PopupOnCancel } from 'tantalum-ui-mobile'
```

## Props

| 属性            | 类型                  | 默认值   | 必填 | 说明                                                                              |
| --------------- | --------------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| v-model:visible | boolean               | false    | 否   | 是否显示                                                                          |
| selector        | string \| HTMLElement |          | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| placement       | PlacementType         | 'bottom' | 否   | 展开位置，可选 'bottom', 'top', 'left', 'right'                                   |
| show-mask       | boolean               | true     | 否   | 是否展示蒙层，如果设置不展示，气泡则是跟随 `selector` 对应的元素                  |
| content         | string                |          | 是   | 文本内容                                                                          |
| show-cancel     | boolean               | true     | 否   | 是否显示取消按钮                                                                  |
| cancel-text     | string                | '取消'   | 否   | 取消按钮的文本                                                                    |
| confirm-text    | string                | '确定'   | 否   | 确定按钮的文本                                                                    |

## Events

| 事件                 | 描述               | 回调函数参数                                                           | TypeScript 函数           |
| -------------------- | ------------------ | ---------------------------------------------------------------------- | ------------------------- |
| confirm              | 确认按钮点击时触发 |                                                                        |                           |
| cancel               | 取消按钮点击时触发 | payload: { source: string }                                            | PopupOnCancel             |
| visible-state-change | 展示隐藏时触发     | payload: { state: [VisibleState](./PopDialog.md#visiblestate-值说明) } | PopupOnVisibleStateChange |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## showPopDialog(object)

显示气泡对话框。

### object

| 属性        | 类型                              | 默认值   | 必填 | 说明                                                                              |
| ----------- | --------------------------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| selector    | string \| HTMLElement             |          | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| placement   | PlacementType                     | 'bottom' | 否   | 展开位置，可选 'bottom', 'top', 'left', 'right'                                   |
| content     | string                            |          | 是   | 文本内容                                                                          |
| showCancel  | boolean                           | true     | 否   | 是否显示取消按钮                                                                  |
| cancelText  | string                            | '取消'   | 否   | 取消按钮的文本                                                                    |
| confirmText | string                            | '确定'   | 否   | 确定按钮的文本                                                                    |
| success     | (payload: SuccessPayload) => void |          | 否   | 接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数                      |
| fail        | (e: Error) => void                |          | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）          |
| complete    | () => void                        |          | 否   | 弹窗关闭或调用失败的回调函数                                                      |

#### SuccessPayload

| 属性     | 类型    | 说明                       |
| -------- | ------- | -------------------------- |
| cancel?  | boolean | 为 true 时，表示取消       |
| confirm? | boolean | 为 true 时，表示点击了确定 |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showPopDialog({
  selector: '#popDialogTarget',
  content: this.content,
  success: res => {
    console.log('success', res)
  }
})
```
