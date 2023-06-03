# Swiper/SwiperItem 轮播

<CodeDemo name="Swiper">

<<< @/../../demo/src/components/Show/Swiper/index.vue

</CodeDemo>

## Import

```js
import { TaSwiper, TaSwiperItem } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { SwiperOnActiveIndexChange, SwiperOnAnimated, SwiperRef } from 'tantalum-ui-mobile'
```

## Swiper Props

| 属性                   | 类型    | 默认值                     | 必填 | 说明                                     |
| ---------------------- | ------- | -------------------------- | ---- | ---------------------------------------- |
| v-model:active-index   | number  | 0                          | 否   | 当前所在滑块的 index                     |
| indicator-dots         | boolean | false                      | 否   | 是否显示面板指示点                       |
| indicator-color        | color   | 'rgba(0, 0, 0, 0.4)'       | 否   | 指示点颜色                               |
| indicator-active-color | color   | 'rgba(255, 255, 255, 0.8)' | 否   | 当前选中的指示点颜色                     |
| autoplay               | boolean | false                      | 否   | 是否自动切换                             |
| interval               | number  | 5000                       | 否   | 自动切换时间间隔                         |
| duration               | number  |                            | 否   | 滑动动画时长，没有设置时使用内置调优时长 |
| initial-circular       | boolean | false                      | 否   | 初始设置是否循环切换                     |
| initial-vertical       | boolean | false                      | 否   | 初始设置是否为纵向滑动                   |
| navigation-buttons     | boolean | false                      | 否   | 是否展示上一页/下一页按钮                |

## Swiper Events

| 事件                | 描述                         | 回调函数参数                               | TypeScript 函数           |
| ------------------- | ---------------------------- | ------------------------------------------ | ------------------------- |
| active-index-change | 切换时触发                   | ( activeIndex: number, fromIndex: number ) | SwiperOnActiveIndexChange |
| animated            | 动画结束时触发               | ( activeIndex: number, fromIndex: number ) | SwiperOnAnimated          |
| click               | 点击时触发，为了区分滑动情况 |                                            |                           |

## Swiper Slots

### #default

注：其中只可放置 [SwiperItem](./Swiper.md#swiperitem-slots) 组件，否则会导致未定义的行为。

```vue
<ta-swiper>
  <ta-swiper-item>
    <ta-image src="a.jpg" />
  </ta-swiper-item>
  <ta-swiper-item>
    <ta-image src="b.jpg" />
  </ta-swiper-item>
  ...
</ta-swiper>
```

## SwiperItem Slots

### #default

```vue
<ta-swiper-item>
  <ta-image src="b.jpg" />
</ta-swiper-item>
```

## Methods

```ts
interface SwiperRef {
  swipeTo: (newIndex: number) => void
  prev: () => void
  next: () => void
}
```

| 方法名  | 说明                                                   |
| ------- | ------------------------------------------------------ |
| swipeTo | 切换到指定 index 的 Item                               |
| prev    | 切换到上一个 Item，如果当前在第一个 ，则循环到最后一个 |
| next    | 切换到下一个 Item，如果当前在最后一个，则循环到第一个  |
