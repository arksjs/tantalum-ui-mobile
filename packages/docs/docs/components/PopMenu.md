# PopMenu 气泡菜单

<CodeDemo name="PopMenu">

<<< @/../../demo/src/components/Navigation/PopMenu/index.vue

</CodeDemo>

## Import

```js
import { AkPopMenu } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  PopMenuOption,
  PopMenuOnConfirm,
  VisibleState,
  PopupOnVisibleStateChange,
  PopupOnCancel
} from 'arkui-mobile-vue'
```

## Props

| 属性            | 类型                  | 默认值   | 必填 | 说明                                                                              |
| --------------- | --------------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| v-model:visible | boolean               | false    | 否   | 是否显示                                                                          |
| selector        | string \| HTMLElement |          | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| placement       | PlacementType         | 'bottom' | 否   | 展开位置，可选 'bottom', 'top', 'left', 'right'                                   |
| show-mask       | boolean               | true     | 否   | 是否展示蒙层，如果设置不展示，气泡则是跟随 `selector` 对应的元素                  |
| options         | PopMenuOption[]       |          | 否   | 选项列表                                                                          |

### PopMenuOption 的结构

```ts
interface MenuOption {
  name: string
  icon?: IconData
  disabled?: boolean
}
```

| key      | 类型   | 默认值 | 必填 | 说明                              |
| -------- | ------ | ------ | ---- | --------------------------------- |
| name     | string |        | 是   | 选项名                            |
| disabled | string | false  | 否   | 是否禁用                          |
| icon     | string |        | 否   | 图标，使用 [Icon](./Icon.md) 组件 |

```js
const options = [
  {
    name: '选项1',
    disabled: false,
    icon: 'MenuOutlined'
  }
]
```

## Events

| 事件                 | 描述               | 回调函数参数                                                         | TypeScript 函数           |
| -------------------- | ------------------ | -------------------------------------------------------------------- | ------------------------- |
| cancel               | 取消时触发         | payload: { source: string }                                          | PopupOnCancel             |
| confirm              | 确认按钮点击时触发 | payload: { item: { name: string }, index: number }                   | PopMenuOnConfirm          |
| visible-state-change | 展示隐藏时触发     | payload: { state: [VisibleState](./PopMenu.md#visiblestate-值说明) } | PopupOnVisibleStateChange |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## showPopMenu(object)

显示气泡菜单。

### object

| 属性      | 类型                                                  | 默认值   | 必填 | 说明                                                                              |
| --------- | ----------------------------------------------------- | -------- | ---- | --------------------------------------------------------------------------------- |
| selector  | string \| HTMLElement                                 |          | 是   | 从哪个元素展开，如果是 string，则为可以被 document.querySelector(selector) 获取到 |
| placement | PlacementType                                         | 'bottom' | 否   | 展开位置，可选 'bottom', 'top', 'left', 'right'                                   |
| options   | [PopMenuOption](./PopMenu.md#popmenuoption-的结构)[\] |          | 否   | 选项列表                                                                          |
| success   | (payload: SuccessPayload) => void                     |          | 否   | 接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数                      |
| fail      | (e: Error) => void                                    |          | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出）          |
| complete  | () => void                                            |          | 否   | 弹窗关闭或调用失败的回调函数                                                      |

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
showPopMenu({
  selector: '#popMenuTarget',
  options: [
    {
      icon: 'HeartOutlined',
      name: '爱心'
    },
    {
      icon: 'StarOutlined',
      name: '星星'
    },
    {
      icon: 'CircleOutlined',
      name: '圈圈',
      disabled: true
    }
  ],
  placement: 'top',
  success: res => {
    console.log('select', res)
  }
})
```
