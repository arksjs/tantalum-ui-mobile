# CountDown 倒计时

注：

- 本组件没有指定样式，默认情况下可对文字样式进行自定义。

<CodeDemo name="CountDown">

<<< @/../../demo/src/components/Show/CountDown/index.vue

</CodeDemo>

## Import

```js
import { CountDown } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  CountTime,
  CountDownOnEnd,
  CountDownOnPause,
  CountDownOnResume,
  CountDownRef
} from 'rfox'
```

## Props

| 属性           | 类型    | 默认值 | 必填 | 说明                |
| -------------- | ------- | ------ | ---- | ------------------- |
| initial-timing | number  | 99     | 否   | 倒计时时长，单位 ms |
| show-days      | boolean | false  | 否   | 是否显示天数        |

## Events

| 事件   | 描述           | 回调函数参数                                                                                              | TypeScript 函数   |
| ------ | -------------- | --------------------------------------------------------------------------------------------------------- | ----------------- |
| pause  | 计时暂停时触发 | payload: { remainTime: number } remainTime 剩余时间，单位 ms                                              | CountDownOnPause  |
| resume | 恢复计时时触发 | payload: { remainTime: number } remainTime 剩余时间，单位 ms                                              | CountDownOnResume |
| end    | 计时结束时触发 | payload: { startTime: number, endTime: number } startTime 本地开始时间戳，endTime 本地结束时间戳，单位 ms | CountDownOnEnd    |

## Slots

支持自定义风格显示

```vue
<ak-count-down :initial-timing="timestamp">
  <template #default="countTime">
    {{ countTime.fullHours }}:{{ countTime.minutes }}:{{
        countTime.seconds
    }}.{{ countTime.milliseconds }}
  </template>
</ak-count-down>
```

### countTime 的结构

| 字段名             | 类型   | 说明                                        |
| ------------------ | ------ | ------------------------------------------- |
| time               | number | 持续时间                                    |
| days               | string | 天数                                        |
| hours              | string | 小时数（<24），需要跟 days 配合，保留 2 位  |
| fullHours          | string | 小时数，含天数综合，如 '124'，至少保留 2 位 |
| thousandsFullHours | string | 千分位形式的小时数，含天数综合，如 '1,234'  |
| minutes            | string | 分钟数，保留 2 位                           |
| seconds            | string | 秒钟数，保留 2 位                           |
| milliseconds       | string | 毫秒数，保留 3 位                           |

## Methods

| 方法名 | 说明       | 参数                                            |
| ------ | ---------- | ----------------------------------------------- |
| pause  | 暂停倒计时 |                                                 |
| resume | 恢复倒计时 |                                                 |
| reset  | 重置倒计时 | ( timing: number, autoStart?: boolean ) 单位 ms |
