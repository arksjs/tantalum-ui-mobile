# SideTab 侧边标签栏

<CodeDemo name="SideTab">

<<< @/../../demo/src/components/Navigation/SideTab/index.vue

</CodeDemo>

## Import

```js
import { TaSideTab } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  SideTabOnChange,
  SideTabOptions,
  SideTabOption,
  BadgeOption,
  SideBarRef
} from 'tantalum-ui-mobile'
```

## Props

| 属性         | 类型             | 默认值 | 必填 | 说明                         |
| ------------ | ---------------- | ------ | ---- | ---------------------------- |
| v-model      | string \| number |        | 否   | 当前激活项的 value 值        |
| options      | SideTabOptions   | []     | 是   | tab 数据集                   |
| color        | string           |        | 否   | 自定义默认态字体和图标颜色   |
| active-color | string           |        | 否   | 自定义激活态的字体和图标颜色 |

### SideTabOptions

```ts
type SideTabOption = {
  label: string
  value: number | string
  icon?: IconData
  activeIcon?: IconData
  badge?: BadgeOption
  subLabel?: string
}

type SideTabOptions = (number | string | SideTabOption)[]
```

| key        | 类型                | 默认值 | 必填 | 说明                                                       |
| ---------- | ------------------- | ------ | ---- | ---------------------------------------------------------- |
| value      | string \| number    |        | 是   | 唯一值（v-model 使用）                                     |
| label      | string              |        | 是   | 标签名                                                     |
| icon       | string \| Component |        | 否   | 设置图标，使用 [Icon](./Icon.md) 组件，也支持图像 URL      |
| activeIcon | string \| Component |        | 否   | 设置激活态图标，也支持图像 URL，没有设置则沿用 `icon` 属性 |
| badge      | BadgeOption         |        | 否   | 徽标，使用 [Badge](./Badge.md) 组件                        |

```js
const options = [
  {
    value: 1,
    label: '首页',
    icon: 'HomeOutlined',
    badge: '热'
  },
  {
    value: 2,
    label: '搜索',
    icon: 'SearchOutlined',
    badge: {
      dot: true,
      content: 1
    }
  }
]
```

也可以直接设置为 `string[]` 或 `number[]`，如：

```js
const options = ['aaa', 'bbb', 'ccc']
```

将被转为：

```js
const options = [
  {
    value: 'aaa',
    label: 'aaa'
  },
  {
    value: 'bbb',
    label: 'bbb'
  }
  {
    value: 'ccc',
    label: 'ccc'
  }
]
```

注：注意数组项要保持唯一性。

### BadgeOption

```ts
type BadgeOption =
  | number
  | string
  | Partial<{
      color: string
      content: string | number
      offset: number[]
      animated: boolean
      dot: boolean
      maxCount: number
      showZero: boolean
    }>
```

参数主要是基于 [Badge](./Badge.md) 组件的 props，如果传入是 `number` 或者 `string` 则设置直接设置 content 属性。

## Events

| 事件   | 描述                | 回调函数参数                               | TypeScript 函数 |
| ------ | ------------------- | ------------------------------------------ | --------------- |
| change | 点击切换 tab 时触发 | ( value：string \| number, index: number ) | SideTabOnChange |

### change 的回调参数

| 参数  | 类型             | 描述                  |
| ----- | ---------------- | --------------------- |
| value | string \| number | 当前激活项的 value 值 |
| index | number           | 当前激活项的索引值    |

## Methods

```ts
interface SideBarRef {
  switchTo: (value: string | number) => void
  switchToIndex: (index: number) => void
}
```

| 方法名        | 说明                    |
| ------------- | ----------------------- |
| switchTo      | 切换到指定 value 的 Tab |
| switchToIndex | 切换到指定索引的 Tab    |
