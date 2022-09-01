# Button/ButtonGroup 按钮

<CodeDemo name="Button">

<<< @/../../demo/src/components/Basic/Button/index.vue

</CodeDemo>

## Import

```js
import { Button, ButtonGroup } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { SizeType, StateType, ButtonShape, ButtonPattern } from 'vfox'
```

## Button Props

| 属性      | 类型                | 默认值      | 必填 | 说明                                                                               |
| --------- | ------------------- | ----------- | ---- | ---------------------------------------------------------------------------------- |
| size      | SizeType            | 'large'     | 否   | 按钮尺寸                                                                           |
| type      | StateType           | 'default'   | 否   | 按钮类型                                                                           |
| pattern   | ButtonPattern       | 'default'   | 否   | 按钮款式                                                                           |
| shape     | ButtonShape         | 'rectangle' | 否   | 按钮形状                                                                           |
| color     | string              |             | 否   | 自定义色彩，支持 hex rgb hsl 等写法，详细效果[查看](../design/color.md#自定义色彩) |
| ghost     | boolean             | false       | 否   | 是否使用幽灵按钮，幽灵按钮将按钮的内容反色，背景变为透明                           |
| disabled  | boolean             | false       | 否   | 是否禁用                                                                           |
| icon      | string \| Component |             | 否   | 图标，使用 [Icon](./Icon.md) 组件                                                  |
| loading   | boolean             | false       | 否   | 名称前是否带 loading 图标，优先级大于 icon                                         |
| form-type | string              |             | 否   | 'submit' / 'reset'                                                                 |

### SizeType 的合法值

| 值    | 说明                                      |
| ----- | ----------------------------------------- |
| large | 默认大小，高度 48px，文字 17px，图标 21px |
| small | 小尺寸，高度 28px，文字 12px，图标 18px   |

### StateType 的合法值

| 值      | 说明 |
| ------- | ---- |
| default | 次要 |
| primary | 主要 |
| success | 成功 |
| warning | 警告 |
| danger  | 危险 |

### ButtonPattern 的合法值

| 值         | 说明       |
| ---------- | ---------- |
| default    | 默认按钮   |
| solid      | 细线按钮   |
| dashed     | 虚线按钮   |
| borderless | 无边框按钮 |
| gradient   | 渐变色按钮 |

### ButtonShape 的合法值

| 值        | 说明                                         |
| --------- | -------------------------------------------- |
| rectangle | 长方形按钮，小圆角                           |
| round     | 半圆角按钮                                   |
| circle    | 圆圈按钮，搭配图标使用，不显示文字           |
| square    | 正方形按钮，小圆角，搭配图标使用，不显示文字 |

## Button Slots

### #default

```vue
<fx-button form-type="submit">提交</fx-button>
```

## ButtonGroup Props

| 属性    | 类型          | 默认值      | 必填 | 说明         |
| ------- | ------------- | ----------- | ---- | ------------ |
| size    | SizeType      | 'large'     | 否   | 每个按钮尺寸 |
| pattern | ButtonPattern | 'default'   | 否   | 每个按钮款式 |
| shape   | ButtonShape   | 'rectangle' | 否   | 每个按钮形状 |

## ButtonGroup Slots

### #default

```vue
<fx-button-group shape="square" size="small">
  <fx-button type="default" icon="LeftOutlined"></fx-button>
  <fx-button type="default" icon="HomeOutlined"></fx-button>
</fx-button-group>
```
