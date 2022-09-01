# Divider 分割线

<CodeDemo name="Divider">

<<< @/../../demo/src/components/Show/Divider/index.vue

</CodeDemo>

## Import

```js
import { Divider } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性   | 类型    | 默认值 | 必填 | 说明                         |
| ------ | ------- | ------ | ---- | ---------------------------- |
| title  | string  |        | 否   | 标题，设置后中间显示标题文本 |
| dashed | boolean | false  | 否   | 是否虚线显示                 |

## CSSProperties

| 属性         | 默认值  | 说明       |
| ------------ | ------- | ---------- |
| color        | #bfbfbf | 文本颜色   |
| border-color | #f0f0f0 | 分割线颜色 |
