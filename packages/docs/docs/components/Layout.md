# Layout 布局

基于 Flex 栅格化系统，利用 Row 和列 Col 来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。

<CodeDemo name="Layout">

<<< @/../../demo/src/components/Show/Layout/index.vue

</CodeDemo>

## Import

```js
import { Row, Col } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Row Props

| 属性    | 类型                         | 默认值  | 必填 | 说明                                                                                        |
| ------- | ---------------------------- | ------- | ---- | ------------------------------------------------------------------------------------------- |
| gutter  | string \| number \| number[] | 0       | 否   | 栅格间隔，通过数值设置水平间隔，也可以通过数组的形式设置水平和垂直间隔 [水平间隔, 垂直间隔] |
| justify | RowJustify                   | 'start' | 否   | 水平排列方式，可选值：'start', 'end', 'center', 'space-around', 'space-between'             |
| align   | RowAlign                     | 'top'   | 否   | 水平排列方式，可选值：'top', 'middle', 'bottom'                                             |

## Row Slots

```vue
<fx-row :gutter="10">
  <fx-col :span="24">Layout</fx-col>
</fx-row>
```

## Col Props

| 属性   | 类型             | 默认值 | 必填 | 说明                          |
| ------ | ---------------- | ------ | ---- | ----------------------------- |
| span   | string \| number | 24     | 否   | 栅格占据的列数，可选 1-24     |
| offset | string \| number | 0      | 否   | 栅格左侧的间隔格数，可选 1-24 |
| push   | string \| number | 0      | 否   | 栅格向右移动格数，可选 1-24   |
| pull   | string \| number | 0      | 否   | 栅格向左移动格数，可选 1-24   |

## Col Slots

```vue
<fx-row :gutter="10">
  <fx-col :span="24">Layout</fx-col>
</fx-row>
```
