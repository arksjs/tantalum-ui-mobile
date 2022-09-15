# Notify 消息提示

<CodeDemo name="Notify">

<<< @/../../demo/src/components/Feedback/Notify/index.vue

</CodeDemo>

## Import

```js
import { AkNotify } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  VisibleState,
  PopupOnVisibleStateChange,
  StateType
} from 'arkui-mobile-vue'
```

## Props

| 属性            | 类型      | 默认值    | 必填 | 说明                                                                               |
| --------------- | --------- | --------- | ---- | ---------------------------------------------------------------------------------- |
| v-model:visible | boolean   | false     | 否   | 是否显示                                                                           |
| title           | string    |           | 否   | 提示内容                                                                           |
| closable        | boolean   | false     | 否   | 是否显示关闭按钮                                                                   |
| icon            | string    |           | 否   | 图标，使用 [Icon](./Icon.md) 组件，图标优先级高于 `type`                           |
| type            | StateType | 'default' | 否   | 提示类型                                                                           |
| duration        | number    | 0         | 否   | visible=true 展示后，duration 毫秒后消失，0 为不消失，在 `v-model:visible` 下生效  |
| color           | string    |           | 否   | 自定义色彩，支持 hex rgb hsl 等写法，详细效果[查看](../design/color.md#自定义色彩) |

### StateType 的合法值

| 值      | 说明             |
| ------- | ---------------- |
| default | 警告，同 warning |
| primary | 提示             |
| success | 成功             |
| warning | 警告             |
| danger  | 强烈警告         |

## Events

| 事件                 | 描述           | 回调函数参数                                                        | TypeScript 函数           |
| -------------------- | -------------- | ------------------------------------------------------------------- | ------------------------- |
| visible-state-change | 展示隐藏时触发 | payload: { state: [VisibleState](./Notify.md#visiblestate-值说明) } | PopupOnVisibleStateChange |

### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## showNotify(object)

显示消息提示。

注：Notify 接口目前仅支持单例模式。

### object

| 属性     | 类型                                        | 默认值    | 必填 | 说明                                                                               |
| -------- | ------------------------------------------- | --------- | ---- | ---------------------------------------------------------------------------------- |
| title    | string                                      |           | 否   | 提示内容                                                                           |
| type     | [StateType](./Notify.md#statetype-的合法值) | 'default' | 否   | 提示类型                                                                           |
| icon     | string                                      |           | 否   | 图标，使用 [Icon](../components/Icon.md) 组件，图标优先级高于 `type`               |
| duration | number                                      | 1500      | 否   | 展示时长(单位 ms)，值为 0 时，`notify` 不会消失                                    |
| color    | string                                      |           | 否   | 自定义色彩，支持 hex rgb hsl 等写法，详细效果[查看](../design/color.md#自定义色彩) |
| closable | boolean                                     | false     | 否   | 是否显示关闭按钮                                                                   |
| success  | () => void                                  |           | 否   | 接口调用成功的回调函数                                                             |
| fail     | (e: Error) => void                          |           | 否   | 接口调用失败的回调函数（不传入 fail 遇错误直接抛出）                               |
| complete | () => void                                  |           | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                                   |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showNotify({
  title: '提示内容',
  duration: 2000
})
```

## hideNotify([object])

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
hideNotify()
```
