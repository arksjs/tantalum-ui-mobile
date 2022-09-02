# ActionSheet 动作面板

<CodeDemo name="ActionSheet">

<<< @/../../demo/src/components/Feedback/ActionSheet/index.vue

</CodeDemo>

## Import

```js
import { FxActionSheet } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  ActionSheetOption,
  ActionSheetOnConfirm,
  VisibleState,
  PopupOnVisibleStateChange,
  PopupOnCancel
} from 'arkui-mobile-vue'
```

## Props

| 属性            | 类型                | 默认值 | 必填 | 说明                       |
| --------------- | ------------------- | ------ | ---- | -------------------------- |
| v-model:visible | boolean             | false  | 否   | 是否显示                   |
| title           | string              |        | 否   | 标题，不设置则不展示标题栏 |
| options         | ActionSheetOption[] |        | 是   | 选项列表                   |
| mask-closable   | boolean             | true   | 否   | 点击蒙层是否触发关闭操作   |
| show-cancel     | boolean             | false  | 否   | 是否显示取消按钮           |
| cancel-text     | string              | '取消' | 否   | 取消按钮的文本             |

### ActionSheetOption 的结构

| key         | 类型   | 默认值 | 必填 | 说明         |
| ----------- | ------ | ------ | ---- | ------------ |
| name        | string |        | 是   | 展示名称     |
| description | string |        | 否   | 附加描述     |
| disabled    | string | false  | 否   | 是否禁用     |
| highlight   | string | false  | 否   | 是否高亮显示 |

```ts
interface ActionSheetOption {
  name: string
  highlight?: boolean
  description?: string
  disabled?: boolean
}

const options: ActionSheetOption[] = [
  {
    name: '选项1',
    disabled: false,
    description: '选项描述',
    highlight: false
  }
]
```

## Events

| 事件                 | 描述                           | 回调函数参数                                                             | 函数 TypeScript           |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------ | ------------------------- |
| confirm              | 点击选项时触发                 | payload: { item: { name: string }, index: number }                       | ActionSheetOnConfirm      |
| visible-state-change | 展示隐藏时触发                 | payload: { state: [VisibleState](./ActionSheet.md#visiblestate-值说明) } | PopupOnVisibleStateChange |
| cancel               | 取消按钮或者点击蒙层关闭时触发 | payload: { source: string }                                              | PopupOnCancel             |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## showActionSheet(object)

显示动作面板。

### object

| 属性       | 类型                                                              | 默认值 | 必填 | 说明                                                                     |
| ---------- | ----------------------------------------------------------------- | ------ | ---- | ------------------------------------------------------------------------ |
| title      | string                                                            |        | 否   | 提示的标题，不设置则不展示                                               |
| options    | [ActionSheetOption](./ActionSheet.md#actionsheetoption-的结构)[\] |        | 是   | 选项列表                                                                 |
| showCancel | boolean                                                           | false  | 否   | 是否显示取消按钮                                                         |
| cancelText | string                                                            | '取消' | 否   | 取消按钮的文字                                                           |
| success    | (payload: SuccessPayload) => void                                 |        | 否   | 接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数             |
| fail       | (e: Error) => void                                                |        | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出） |
| complete   | () => void                                                        |        | 否   | 弹窗关闭或调用失败的回调函数                                             |

#### SuccessPayload

| 属性              | 类型    | 说明                                              |
| ----------------- | ------- | ------------------------------------------------- |
| confirm?          | boolean | 为 true 时，表示用户点击了选项，此时返回 `detail` |
| cancel?           | boolean | 为 true 时，表示用户点击了取消                    |
| detail?.item.name | string  | confirm=true 时点击 item 的选项名                 |
| detail?.index     | number  | confirm=true 时点击 item 的索引                   |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showActionSheet({
  title: '标题',
  options: [
    {
      name: '选项1',
      description: '选项1的描述文案'
    },
    {
      name: '选项2'
    },
    {
      name: '选项3'
    }
  ],
  showCancel: true,
  success: ({ confirm, cancel, detail }) => {
    ...
  }
})
```
