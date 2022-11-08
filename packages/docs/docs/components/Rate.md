# Rate 评分

注：

- 支持表单，具体可参考 [Form](./Form.md)。

<CodeDemo name="Rate">

<<< @/../../demo/src/components/Form/Rate/index.vue

</CodeDemo>

## Import

```js
import { TaRate } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性         | 类型                | 默认值         | 必填 | 说明                                    |
| ------------ | ------------------- | -------------- | ---- | --------------------------------------- |
| v-model      | number              |                | 否   |
| name         | string              |                | 否   | 标识                                    |
| count        | number \| string    | 5              | 否   | 有 count 个星星，只支持 1~20 整数       |
| allow-half   | boolean             | false          | 否   | 是否允许半选                            |
| disabled     | boolean             | false          | 否   | 是否禁用                                |
| readonly     | boolean             | false          | 否   | 是否为只读状态                          |
| icon         | string \| Component | 'StarOutlined' | 否   | 默认图标，使用 [Icon](./Icon.md) 组件   |
| active-icon  | string \| Component | 'StarFilled'   | 否   | 激活时图标，使用 [Icon](./Icon.md) 组件 |
| color        | string              |                | 否   | 自定义默认态的图标颜色                  |
| active-color | string              |                | 否   | 自定义激活态的图标颜色                  |
| size         | number \| string    |                | 否   | 自定义图标大小，单位 px                 |

## Events

| 事件   | 描述                 | 回调函数参数      |
| ------ | -------------------- | ----------------- |
| change | 点击星星时触发的事件 | ( value: number ) |
