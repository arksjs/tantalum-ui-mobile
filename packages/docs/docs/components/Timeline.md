# Timeline/TimelineItem 步骤条

<CodeDemo name="Timeline">

<<< @/../../demo/src/components/Show/Timeline/index.vue

</CodeDemo>

## Import

```js
import { TaTimeline, TaTimelineItem } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Timeline

### Timeline Slots

#### #default

注：其中只可放置 [TimelineItem](./Timeline.md#timelineitem-props) 组件，否则会导致未定义的行为。

```vue
<ta-timeline>
  <ta-timeline-item title="成功获得0.01元收益">搞半天就这点？</ta-timeline-item>
  <ta-timeline-item title="十天后到账">0.01元还要十天到账？</ta-timeline-item>
  <ta-timeline-item title="爱要不要">不要了，滚。</ta-timeline-item>
</ta-timeline>
```

## TimelineItem

### TimelineItem Props

| 属性      | 类型   | 默认值 | 必填 | 说明           |
| --------- | ------ | ------ | ---- | -------------- |
| title     | string |        | 否   | 时间轴子项标题 |
| dot-color | string |        | 否   | 时间轴节点颜色 |

### TimelineItem Slots

#### 内容（#default）

```vue
<ta-timeline-item title="标题">自定义内容</ta-timeline-item>
```

#### 标题（#title）

```vue
<ta-timeline-item>
  <template #title>
  【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a>）
  </template>
  2021-04-13 11:22:16
</ta-timeline-item>
```

注：优先级高于 Props `title`。

#### 节点（#dot）

```vue
<ta-timeline-item>
  <template #dot">
    <ta-icon icon="CheckOutlined"></ta-icon>
  </template>
</ta-timeline-item>
```
