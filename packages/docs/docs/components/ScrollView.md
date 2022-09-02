# ScrollView 滚动区

<CodeDemo name="ScrollView">

<<< @/../../demo/src/components/Basic/ScrollView/index.vue

</CodeDemo>

注：

- 需要给 `ScrollView` 一个固定高度，通过 CSS 设置 height。

## Import

```js
import { FxScrollView } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  ScrollViewPullDirection,
  ScrollViewOnScrollToUpper,
  ScrollViewOnScrollToLower,
  ScrollViewOnRefreshing,
  ScrollViewOnScroll
} from 'arkui-mobile-vue'
```

## Props

| 属性                   | 类型                                                 | 默认值 | 必填 | 说明                                                                                                  |
| ---------------------- | ---------------------------------------------------- | ------ | ---- | ----------------------------------------------------------------------------------------------------- |
| scroll-x               | boolean                                              | false  | 否   | 允许横向滚动                                                                                          |
| scroll-y               | boolean                                              | false  | 否   | 允许纵向滚动                                                                                          |
| upper-threshold        | string \| number                                     | 50     | 否   | 距顶部/左边多远时，触发 `scroll-to-upper` 事件                                                        |
| lower-threshold        | string \| number                                     | 50     | 否   | 距底部/右边多远时，触发 `scroll-to-lower` 事件                                                        |
| scroll-top             | string \| number                                     |        | 否   | 设置竖向滚动条位置                                                                                    |
| scroll-left            | string \| number                                     |        | 否   | 设置横向滚动条位置                                                                                    |
| scroll-animated        | boolean                                              | false  | 否   | 在设置滚动条位置时使用动画过渡                                                                        |
| enable-pull-directions | ScrollViewPullDirection \| ScrollViewPullDirection[] | []     | 否   | 开启下拉刷新，可以同时开启多个方向，可选值：'up', 'down', 'left', 'right'，搭配 `refreshing` 事件使用 |
| pull-refresh-threshold | number                                               | 48     | 否   | 设置下拉刷新阈值，自定义 indicator slot 时可以配合修改                                                |

## Events

| 事件            | 描述                  | 回调函数参数                                                                                                                                 | TypeScript 函数           |
| --------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| scroll-to-upper | 滚动到顶部/左边时触发 | payload: { direction: 'top' \| 'left' }                                                                                                      | ScrollViewOnScrollToUpper |
| scroll-to-lower | 滚动到底部/右边时触发 | payload: { direction: 'bottom' \| 'right' }                                                                                                  | ScrollViewOnScrollToLower |
| scroll          | 滚动时触发            | payload: { scrollLeft: number, scrollTop: number, scrollWidth: number, scrollHeight: number }                                                | ScrollViewOnScroll        |
| refreshing      | 下拉刷新时触发        | payload: ( pullDirection: 'up' \| 'right' \| 'down' \| 'left', done: () => void ) 其中 pullDirection 指下拉的方向，done 指刷新完毕回调的函数 | ScrollViewOnRefreshing    |

## Slots

### #default

```vue
<ak-scroll-view>自定义内容</ak-scroll-view>
```

### 下拉指示器（#indicator）

```vue
<ak-scroll-view>
  <template #indicator="slotProps">
    方向：{{ slotProps.pullDirection }} 状态：{{
      slotProps.pullRefreshState
    }}
  </template>
</ak-scroll-view>
```
