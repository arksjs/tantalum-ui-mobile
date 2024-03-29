# Image 图片

<CodeDemo name="Image">

<<< @/../../demo/src/components/Basic/Image/index.vue

</CodeDemo>

## Import

```js
import { TaImage } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { ImageMode, ImageOnLoad } from 'tantalum-ui-mobile'
```

## Props

| 属性         | 类型      | 默认值        | 必填 | 说明                                                                    |
| ------------ | --------- | ------------- | ---- | ----------------------------------------------------------------------- |
| src          | string    |               | 否   | 图片资源地址                                                            |
| mode         | ImageMode | 'scaleToFill' | 否   | 图片裁剪、缩放的模式                                                    |
| aspect-ratio | boolean   |               | 否   | 限制宽高比，设置了该项，只要宽度设定，高度会按造比例显示，如 1 为正方形 |
| lazy-load    | boolean   | false         | 否   | 图片懒加载，在即将进入一定范围(preload=1.3)时才开始加载                 |
| auto-height  | boolean   | false         | 否   | 跟原生 img 标签一样，自动计算高度                                       |

### ImageMode 的合法值

| 属性         | 说明                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| scaleToFill  | 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 `image` 元素                                                              |
| aspectFit    | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。                                       |
| aspectFill   | 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
| widthFix     | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变                                                                                 |
| top          | 裁剪模式，不缩放图片，只显示图片的顶部区域                                                                                           |
| bottom       | 裁剪模式，不缩放图片，只显示图片的底部区域                                                                                           |
| center       | 裁剪模式，不缩放图片，只显示图片的中间区域                                                                                           |
| left         | 裁剪模式，不缩放图片，只显示图片的左边区域                                                                                           |
| right        | 裁剪模式，不缩放图片，只显示图片的右边区域                                                                                           |
| top left     | 裁剪模式，不缩放图片，只显示图片的左上边区域                                                                                         |
| top right    | 裁剪模式，不缩放图片，只显示图片的右上边区域                                                                                         |
| bottom left  | 裁剪模式，不缩放图片，只显示图片的左下边区域                                                                                         |
| bottom right | 裁剪模式，不缩放图片，只显示图片的右下边区域                                                                                         |

## Events

| 事件  | 描述                 | 回调函数参数                                            | TypeScript 函数 |
| ----- | -------------------- | ------------------------------------------------------- | --------------- |
| error | 当错误发生时触发     | e: Error                                                |                 |
| load  | 当图片载入完毕时触发 | payload: { height: number, width: number, src: string } | ImageOnLoad     |
