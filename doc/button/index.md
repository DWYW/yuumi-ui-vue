<script setup>
import BaseExample from "../../examples/button/base.vue"
import BaseExampleCode from "../../examples/button/base.vue?raw"

import SizeExample from "../../examples/button/size.vue"
import SizeExampleCode from "../../examples/button/size.vue?raw"

import SplashExample from "../../examples/button/splash.vue"
import SplashExampleCode from "../../examples/button/splash.vue?raw"

import DisabledExample from "../../examples/button/disabled.vue"
import DisabledExampleCode from "../../examples/button/disabled.vue?raw"

import ShapeExample from "../../examples/button/shape.vue"
import ShapeExampleCode from "../../examples/button/shape.vue?raw"
</script>

### 基本用法

theme 可选值为 `primary`、 `success`、 `warn`、 `danger`。

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 大小设置

可选值为 `xl`、 `lg`、 `md`、 `sm`、 `xm`，默认值为 `md`。

<ExamplePreview :code="SizeExampleCode">
  <SizeExample />
</ExamplePreview>

### 开启点击效果

通过 `splash` 开启

<ExamplePreview :code="SplashExampleCode">
  <SplashExample />
</ExamplePreview>

### 禁用状态

<ExamplePreview :code="DisabledExampleCode">
  <DisabledExample />
</ExamplePreview>

### 圆角和圆形

通过 `round` 和 `circle` 设置。

<ExamplePreview :code="ShapeExampleCode">
  <ShapeExample />
</ExamplePreview>
