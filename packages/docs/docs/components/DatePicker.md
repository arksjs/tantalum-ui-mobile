# DatePicker/DatePickerPopup/DatePickerView 时间选择器

注：

- 这 3 个组件是渐进式组件，可查看 [渐进式组件](../design/progressive.md) 了解。

## Import

```js
import {
  FxDatePicker,
  FxDatePickerPopup,
  FxDatePickerView
} from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  DatePickerMode,
  DatePickerOptionFilter,
  DatePickerOnConfirm,
  SelectorOnChange,
  SelectorModelValue,
  SelectorDetail,
  SelectorValueParser,
  SelectorValueFormatter,
  VisibleState,
  PopupOnVisibleStateChange,
  PopupOnCancel
} from 'arkui-mobile-vue'
```

## 公共 Props

| 属性            | 类型                                                                                                             | 默认值                       | 必填 | 说明                                                                                                                                                                                                                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| v-model         | [SelectorValue](./DatePicker.md#selectorvalue-的类型) \| [SelectorValue](./DatePicker.md#selectorvalue-的类型)[] |                              | 否   | 选中值                                                                                                                                                                                                                                                                                                       |
| initial-mode    | [DatePickerMode](./DatePicker.md#datepickermode)                                                                 |                              | 否   | 选择的模式，可选 'date', 'time', 'datetime' 等                                                                                                                                                                                                                                                               |
| min-date        | Date                                                                                                             | 当天对应 10 年前的 Date 实例 | 否   | 最小时间对应的 Date 实例（含）                                                                                                                                                                                                                                                                               |
| max-date        | Date                                                                                                             | 当天最后一秒的 Date 实例     | 否   | 最大时间对应的 Date 实例（含）                                                                                                                                                                                                                                                                               |
| format-template | string                                                                                                           |                              | 否   | 格式的模板，如 `YYYY-MM-DD`，模板规则参考 [Dayjs](https://dayjs.fenxianglu.cn/category/parse.html#%E5%AD%97%E7%AC%A6%E4%B8%B2)。设置后 v-model 的绑定变为格式化后的 string 类型，不再是 Date 实例。推荐根据 `initialMode` 选型来确定，如 `initialMode='minute-second'`，则可设置 `formatTemplate='mm分ss秒'` |
| filter          | [DatePickerOptionFilter](./DatePicker.md#datepickeroptionfilter)                                                 |                              | 否   | 选项过滤器                                                                                                                                                                                                                                                                                                   |
| formatter       | [SelectorValueFormatter](./DatePicker.md#selectorvalueformatter)                                                 |                              | 否   | 和 `parser` 成对设置，对于 v-model 的值进行转化                                                                                                                                                                                                                                                              |
| parser          | [SelectorValueParser](./DatePicker.md#selectorvalueparser)                                                       |                              | 否   | 和 `formatter` 成对设置，对于 v-model 的值进行反转化                                                                                                                                                                                                                                                         |

注：Date 实例对未设置的前段值采用当前时间补上，后段则采用初始时间，如：initialMode='month-day-hour'下， 选取 5 月 7 日 12 点，则 Date 实例对应的时间为：`Fri May 07 2021 12:00:00 GMT+0800`，设置 `minDate`，`maxDate` 的时候需要考虑到。

### SelectorValue 的类型

允许的类型为：`string | number | Date`

在不自定义 `formatter/parser` 的情况下，v-model 只有 `Date` 这种情况。

### SelectorModelValue 的类型

SelectorModelValue 的类型为： `SelectorValue | SelectorValue[]`

### SelectorDetail 的结构

| 字段  | 类型                                                            | 说明                                                                                                                         |
| ----- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| value | [SelectorModelValue](./DatePicker.md#selectormodelvalue-的类型) | 默认为选择时间的 Date 实例；如果设置了 `formatTemplate` 则为 `formatTemplate` 转为结果；还有 `formatter/parser` 的优先级更高 |
| label | string                                                          | 格式化内容，如果没有设置 `formatTemplate`，则采用内置模板                                                                    |

### DatePickerMode

| 值                                | 说明                                         |
| --------------------------------- | -------------------------------------------- |
| date                              | 日期 (year-month-day)                        |
| time                              | 时间 (hour-minute-second)                    |
| datetime                          | 日期时间 (year-month-day-hour-minute-second) |
| minute-second                     | 分秒                                         |
| hour-minute                       | 时分                                         |
| hour-minute-second                | 时分秒                                       |
| day-hour                          | 天时                                         |
| month-day                         | 月日                                         |
| month-day-hour                    | 月日时                                       |
| month-day-hour-minute             | 月日时分                                     |
| year-month                        | 年月                                         |
| year-month-day                    | 年月日                                       |
| year-month-day-hour               | 年月日时                                     |
| year-month-day-hour-minute        | 年月日时分                                   |
| year-month-day-hour-minute-second | 年月日时分秒                                 |

### DatePickerOptionFilter

```ts
interface DatePickerOptionFilter {
  (
    number: number,
    type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
  ): boolean
}
```

通过返回 `false` 来过滤指定选项。

### formatter/parser

高阶配置，`formatter` 和 `parser` 需要一同设置，对 v-model 的值转为自定义值。

#### SelectorValueFormatter

```ts
interface SelectorValueFormatter {
  (valueArray: SelectorValue[], labelArray: string[]):
    | {
        value: SelectorValue | SelectorValue[]
        label: string
      }
    | (SelectorValue | SelectorValue[])
}
```

将 v-model 的原始值转为需要的自定义值，值需要满足 [SelectorModelValue](./DatePicker.md#selectormodelvalue-的类型) 的类型约束，可以返回 { value, label } 对两个数据进行修改，或者单独返回 value。

#### SelectorValueParser

```ts
interface SelectorValueParser {
  (value: unknown): SelectorValue[]
}
```

跟 `SelectorValueFormatter` 相反，将自定义 v-model 的值转为组件认识的原始数组。

## DatePicker 时间选择器

注：

- 支持表单，具体可参考 [Form](./Form.md)。

<CodeDemo name="DatePicker">

<<< @/../../demo/src/components/Form/DatePicker/index.vue

</CodeDemo>

### DatePicker Props

| 属性        | 类型    | 默认值 | 必填 | 说明                                 |
| ----------- | ------- | ------ | ---- | ------------------------------------ |
| name        | string  |        | 否   | 标识                                 |
| placeholder | string  |        | 否   | 没有选中值的提示，也会用在弹窗标题上 |
| disabled    | boolean | false  | 否   | 是否禁用                             |

### DatePicker Events

| 事件   | 描述                       | 回调函数参数                                                             | 函数 TypeScript  |
| ------ | -------------------------- | ------------------------------------------------------------------------ | ---------------- |
| change | 选择后选中值发生变化时触发 | payload: [SelectorModelValue](./DatePicker.md#selectormodelvalue-的类型) | SelectorOnChange |

## DatePickerPopup 时间选择弹窗

<CodeDemo name="DatePickerPopup">

<<< @/../../demo/src/components/Form/DatePickerPopup/index.vue

</CodeDemo>

### DatePickerPopup Props

| 属性            | 类型    | 默认值 | 必填 | 说明         |
| --------------- | ------- | ------ | ---- | ------------ |
| v-model:visible | boolean | false  | 否   | 是否显示弹窗 |
| title           | string  |        | 否   | 弹窗标题     |

### DatePickerPopup Events

| 事件                 | 描述                 | 回调函数参数                                                             | 函数 TypeScript           |
| -------------------- | -------------------- | ------------------------------------------------------------------------ | ------------------------- |
| cancel               | 点击取消按钮后触发   |                                                                          | PopupOnCancel             |
| confirm              | 点击确定按钮后触发   | payload: [SelectorDetail](./DatePicker.md#selectordetail-的结构)         | DatePickerOnConfirm       |
| change               | 选中值发生变化时触发 | payload: [SelectorModelValue](./DatePicker.md#selectormodelvalue-的类型) | SelectorOnChange          |
| visible-state-change | 展示隐藏时触发       | payload: { state: [VisibleState](./DatePicker.md#visiblestate-值说明) }  | PopupOnVisibleStateChange |

#### VisibleState 值说明

| 值     | 说明                 | 备注                                              |
| ------ | -------------------- | ------------------------------------------------- |
| show   | 展示时触发           |                                                   |
| shown  | 展示且动画结束后触发 |                                                   |
| hide   | 隐藏时触发           | 可能携带其他参数 cancel, maskClick, closeClick 等 |
| hidden | 隐藏且动画结束后触发 | 可能携带其他参数 cancel, maskClick, closeClick 等 |

## DatePickerView 时间选择面板

<CodeDemo name="DatePickerView">

<<< @/../../demo/src/components/Form/DatePickerView/index.vue

</CodeDemo>

### DatePickerView Events

| 事件   | 描述                       | 回调函数参数                                                             | 函数 TypeScript  |
| ------ | -------------------------- | ------------------------------------------------------------------------ | ---------------- |
| change | 滑动后选中值发生变化时触发 | payload: [SelectorModelValue](./DatePicker.md#selectormodelvalue-的类型) | SelectorOnChange |

## showDatePicker(object) 显示时间选择弹窗

### object

| 属性     | 类型                                                             | 默认值                       | 必填 | 说明                                                                     |
| -------- | ---------------------------------------------------------------- | ---------------------------- | ---- | ------------------------------------------------------------------------ |
| title    | string                                                           |                              | 否   | 弹窗标题                                                                 |
| value    | Date                                                             |                              | 否   | 默认选择值                                                               |
| mode     | [DatePickerMode](./DatePicker.md#datepickermode)                 |                              | 否   | 选择的模式，可选 'date', 'time', 'datetime' 等                           |
| minDate  | Date                                                             | 当天对应 10 年前的 Date 实例 | 否   | 最小时间对应的 Date 实例（含）                                           |
| maxDate  | Date                                                             | 当天最后一秒的 Date 实例     | 否   | 最大时间对应的 Date 实例（含）                                           |
| filter   | [DatePickerOptionFilter](./DatePicker.md#datepickeroptionfilter) |                              | 否   | 选项过滤器                                                               |
| success  | (payload: SuccessPayload) => void                                |                              | 否   | 接口调用成功（在用户做出选择后，如取消，选择选项）的回调函数             |
| fail     | (e: Error) => void                                               |                              | 否   | 接口调用失败（如传入错误的参数）的回调函数（不传入 fail 遇错误直接抛出） |
| complete | () => void                                                       |                              | 否   | 弹窗关闭或调用失败的回调函数                                             |

#### SuccessPayload

| 属性          | 类型    | 说明                                          |
| ------------- | ------- | --------------------------------------------- |
| cancel?       | boolean | 为 true 时，表示取消                          |
| confirm?      | boolean | 为 true 时，表示点击了确定，此时返回 `detail` |
| detail?.label | string  | "2021-05-01"                                  |
| detail?.value | Date    | 对应日期的 Date 实例                          |

### Usage

具体调用方式可以参考[API 调用](../guide/import.md#api-调用)。

```js
showDatePicker({
  title: 'DatePicker',
  success: ({ confirm, cancel, detail }) => {
    ...
  }
})
```
