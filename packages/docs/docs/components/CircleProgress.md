# CircleProgress 环形进度条

<CodeDemo name="CircleProgress">

<<< @/../../demo/src/components/Show/CircleProgress/index.vue

</CodeDemo>

## Import

```js
import { AkCircleProgress } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性         | 类型             | 默认值 | 必填 | 说明                |
| ------------ | ---------------- | ------ | ---- | ------------------- |
| percentage   | string \| number |        | 是   | 百分比，例如：50    |
| size         | string \| number | 100    | 否   | 宽高，单位 px       |
| stroke-width | string \| number | 5.37   | 否   | 进度条宽度，单位 px |
| color        | string           |        | 否   | 进度条激活色        |

## Slots

### 内容区（#default）

```vue
<ak-circle-progress :percentage="5">
  <template #default="{ progress }"> 已抢{{ progress }} </template>
</ak-circle-progress>
```
