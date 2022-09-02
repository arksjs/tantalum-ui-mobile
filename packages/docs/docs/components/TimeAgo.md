# TimeAgo 相对时间

注：

- 本组件没有指定样式，默认情况下可对文字样式进行自定义。

<CodeDemo name="TimeAgo">

<<< @/../../demo/src/components/Show/TimeAgo/index.vue

</CodeDemo>

## Import

```js
import { FxTimeAgo } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性            | 类型                     | 默认值 | 必填 | 说明                                                                                                                                   |
| --------------- | ------------------------ | ------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------- |
| time            | Date \| string \| number | 99     | 否   | 需要对比的时间，可以是 Date 类型，时间戳，或者 '2021-05-01' 之类的 string 类型（需要搭配 formatTemplate 使用）                         |
| format-template | string                   |        | 否   | `time` 为 string 类型对应的解析模板，模板规则参考 [Dayjs](https://dayjs.fenxianglu.cn/category/parse.html#%E5%AD%97%E7%AC%A6%E4%B8%B2) |
| interval        | number                   | 60     | 否   | 自动更新的间隔，单位：秒                                                                                                               |
