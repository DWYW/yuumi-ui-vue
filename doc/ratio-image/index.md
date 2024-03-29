<script setup>
import BaseExample from "../../examples/ratio-image/base.vue"
import BaseExampleCode from "../../examples/ratio-image/base.vue?raw"

import ModeExample from "../../examples/ratio-image/mode.vue"
import ModeExampleCode from "../../examples/ratio-image/mode.vue?raw"

import RadiusExample from "../../examples/ratio-image/radius.vue"
import RadiusExampleCode from "../../examples/ratio-image/radius.vue?raw"

import PlaceholderImageExample from "../../examples/ratio-image/placeholder-image.vue"
import PlaceholderImageExampleCode from "../../examples/ratio-image/placeholder-image.vue?raw"

import EventExample from "../../examples/ratio-image/event.vue"
import EventExampleCode from "../../examples/ratio-image/event.vue?raw"
</script>

### 基本用法

ratio 表示矩形的宽高比，默认为1。

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 缩放与裁剪

默认为 `aspectFill`

<ExamplePreview :code="ModeExampleCode">
  <ModeExample />
</ExamplePreview>

| 模式 | 值           | 说明                                                 |
| ---- | ------------ | ---------------------------------------------------- |
| 缩放 | scaleToFill  | 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满元素 |
| 缩放 | aspectFit    | 保持纵横比缩放图片，使图片的长边能完全显示出来。     |
| 缩放 | aspectFill   | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。 |
| 裁剪 | top          | 不缩放图片，只显示图片的顶部区域                     |
| 裁剪 | bottom       | 不缩放图片，只显示图片的底部区域                     |
| 裁剪 | center       | 不缩放图片，只显示图片的中间区域                     |
| 裁剪 | left         | 不缩放图片，只显示图片的左边区域                     |
| 裁剪 | right        | 不缩放图片，只显示图片的右边区域                     |
| 裁剪 | top left     | 不缩放图片，只显示图片的左上边区域                   |
| 裁剪 | top right    | 不缩放图片，只显示图片的右上边区域                   |
| 裁剪 | bottom left  | 不缩放图片，只显示图片的左下边区域                   |
| 裁剪 | bottom right | 不缩放图片，只显示图片的右下边区域                   |

### 设置圆角

<ExamplePreview :code="RadiusExampleCode">
  <RadiusExample />
</ExamplePreview>

### 设置默认图

<ExamplePreview :code="PlaceholderImageExampleCode">
  <PlaceholderImageExample />
</ExamplePreview>

### 事件监听

<ExamplePreview :code="EventExampleCode">
  <EventExample />
</ExamplePreview>
