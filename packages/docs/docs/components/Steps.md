# Steps 步骤条

<CodeDemo name="Steps">

<<< @/../../demo/src/components/Show/Steps/index.vue

</CodeDemo>

## Import

```js
import { TaSteps, TaStep } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Steps Props

| 属性         | 类型    | 默认值 | 必填 | 说明                 |
| ------------ | ------- | ------ | ---- | -------------------- |
| active-index | number  | 0      | 否   | 当前步骤对应的索引值 |
| dot          | boolean | false  | 否   | 是否开启小点样式     |

## Steps Slots

### #default

注：其中只可放置 [Step](./Steps.md#step-props) 组件，否则会导致未定义的行为。

```vue
<ta-steps>
  <ta-step title="成功获得0.01元收益">搞半天就这点？</ta-step>
  <ta-step title="十天后到账">0.01元还要十天到账？</ta-step>
  <ta-step title="爱要不要">不要了，滚。</ta-step>
</ta-steps>
```

## Step Props

| 属性  | 类型   | 默认值 | 必填 | 说明         |
| ----- | ------ | ------ | ---- | ------------ |
| title | string |        | 否   | 步骤子项标题 |

## Step Slots

### 内容（#default）

```vue
<ta-step title="标题">自定义内容</ta-step>
```

### 标题（#title）

```vue
<ta-step>
  <template #title>
  【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a>）
  </template>
  2021-04-13 11:22:16
</ta-step>
```

注：优先级高于 Props `title`。

### 步骤标（#step）

```vue
<ta-step>
  <template #step="{ finish, index, active }">
    <ta-icon v-if="finish" icon="CheckOutlined"></ta-icon>
  </template>
</ta-step>
```

注：只推荐写入 text 和 [Icon](./Icon.md) 组件，其他元素或组件可能会导致未定义的行为。
