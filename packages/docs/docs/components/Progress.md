# Progress 进度条

<CodeDemo name="Progress">

<<< @/../../demo/src/components/Show/Progress/index.vue

</CodeDemo>

## Import

```js
import { TaProgress } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性       | 类型             | 默认值 | 必填 | 说明                                                                                                 |
| ---------- | ---------------- | ------ | ---- | ---------------------------------------------------------------------------------------------------- |
| percentage | string \| number |        | 是   | 百分比，例如：50                                                                                     |
| show-text  | boolean          | false  | 否   | 是否展示文字                                                                                         |
| fixed-bar  | boolean          | false  | 否   | 是否固定进度条宽度，配合 `show-text=true` 使用，防止由于文字 5% 和 100% 宽度不一样导致进度条长短不一 |

## Slots

### 内容区（#default）

```vue
<ta-progress :percentage="5">
  <template #default="{ progress }"> 已抢{{ progress }} </template>
</ta-progress>
```

注：添加 slot 后 `show-text` prop 属性失效。
