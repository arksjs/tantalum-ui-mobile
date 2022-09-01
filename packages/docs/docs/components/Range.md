# Range 区间选择器

注：

- 支持表单，具体可参考 [Form](./Form.md)。

<CodeDemo name="Range">

<<< @/../../demo/src/components/Form/Range/index.vue

</CodeDemo>

## Import

```js
import { Range } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性             | 类型     | 默认值 | 必填 | 说明                                          |
| ---------------- | -------- | ------ | ---- | --------------------------------------------- |
| v-model          | number[] |        | 否   |
| name             | string   |        | 否   | 标识                                          |
| min              | number   | 0      | 否   | 最小值                                        |
| max              | number   | 100    | 否   | 最大值                                        |
| step             | number   | 1      | 否   | 步长，取值必须大于 0，并且可被(max - min)整除 |
| disabled         | boolean  | false  | 否   | 是否禁用                                      |
| show-value       | boolean  | false  | 否   | 是否显示当前 value                            |
| color            | string   |        | 否   | 设置主色                                      |
| allow-same-value | boolean  | true   | 否   | 是否允许重叠的区间                            |

## Events

| 事件   | 描述                     | 回调函数参数    |
| ------ | ------------------------ | --------------- |
| input  | 拖动过程中触发的事件     | value: number[] |
| change | 完成一次拖动后触发的事件 | value: number[] |
