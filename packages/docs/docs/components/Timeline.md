# Timeline/TimelineItem 步骤条

<CodeDemo name="Timeline">

<<< @/../../demo/src/components/Show/Timeline/index.vue

</CodeDemo>

## Import

```js
import { AkTimeline, AkTimelineItem } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Timeline Slots

### #default

注：其中只可放置 [TimelineItem](./Timeline.md#timelineitem-props) 组件，否则会导致未定义的行为。

```vue
<ak-timeline>
  <ak-timeline-item title="成功获得0.01元收益">搞半天就这点？</ak-timeline-item>
  <ak-timeline-item title="十天后到账">0.01元还要十天到账？</ak-timeline-item>
  <ak-timeline-item title="爱要不要">不要了，滚。</ak-timeline-item>
</ak-timeline>
```

## TimelineItem Props

| 属性      | 类型   | 默认值 | 必填 | 说明           |
| --------- | ------ | ------ | ---- | -------------- |
| title     | string |        | 否   | 时间轴子项标题 |
| dot-color | string |        | 否   | 时间轴节点颜色 |

## TimelineItem Slots

### 内容（#default）

```vue
<ak-timeline-item title="标题">
  自定义内容
</ak-timeline-item>
```

### 标题（#title）

```vue
<ak-timeline-item>
  <template #title>
  【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a>）
  </template>
  2021-04-13 11:22:16
</ak-timeline-item>
```

注：优先级高于 Props `title`。

### 节点（#dot）

```vue
<ak-timeline-item>
  <template #dot">
    <ak-icon icon="CheckOutlined"></ak-icon>
  </template>
</ak-timeline-item>
```
