# CountUp 数字动画

注：

- 本组件没有指定样式，默认情况下可对文字样式进行自定义。

<CodeDemo name="CountUp">

<<< @/../../demo/src/components/Show/CountUp/index.vue

</CodeDemo>

## Import

```js
import { CountUp } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { CountUpSpeed, CountUpOnCancel, CountUpOnAnimated } from 'vfox'
```

## Props

| 属性           | 类型         | 默认值   | 必填 | 说明                                                 |
| -------------- | ------------ | -------- | ---- | ---------------------------------------------------- |
| number         | number       | 0        | 否   | 目标值，变化到该数值                                 |
| initial-number | number       | 0        | 否   | 初始值，首次动画会基于 `number` 和该值的差值来做变化 |
| speed          | CountUpSpeed | 'normal' | 否   | 可选 'normal', 'fast', 'slow'，或者固定数字的时间    |
| thousands      | boolean      | false    | 否   | 是否以千分号的形式显示，如：'1,234.56'               |
| decimal-digits | number       | 0        | 否   | 保留 `decimalDigits` 小数位数                        |

### CountUpSpeed

```ts
type CountUpSpeed = 'normal' | 'fast' | 'slow' | number
```

## Events

| 事件     | 描述                             | 回调函数参数                                  | TypeScript 函数   |
| -------- | -------------------------------- | --------------------------------------------- | ----------------- |
| animated | 动画结束后触发，主动取消也会触发 | payload: { number: number } number 为当前数值 | CountUpOnAnimated |
| cancel   | 取消成功时触发                   | payload: { number: number } number 为当前数值 | CountUpOnCancel   |

## Methods

| 方法名 | 说明             | 参数                                            |
| ------ | ---------------- | ----------------------------------------------- |
| cancel | 主动取消动画变化 | 取消成功（动画没结束前取消）会触发 cancel event |
