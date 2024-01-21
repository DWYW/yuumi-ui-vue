<script setup>
import BaseExample from "../../examples/step/base.vue"
import BaseExampleCode from "../../examples/step/base.vue?raw"

import CustomIconExample from "../../examples/step/custom-icon.vue"
import CustomIconExampleCode from "../../examples/step/custom-icon.vue?raw"

import MiniExample from "../../examples/step/mini.vue"
import MiniExampleCode from "../../examples/step/mini.vue?raw"

import ErrorExample from "../../examples/step/error.vue"
import ErrorExampleCode from "../../examples/step/error.vue?raw"

import VerticalExample from "../../examples/step/vertical.vue"
import VerticalExampleCode from "../../examples/step/vertical.vue?raw"
</script>

### 基本用法

通过 `active` 指定当前的步骤，初始值为 0。

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 自定义图标

<ExamplePreview :code="CustomIconExampleCode">
  <CustomIconExample />
</ExamplePreview>

### mini版

<ExamplePreview :code="MiniExampleCode">
  <MiniExample />
</ExamplePreview>

### Error

<ExamplePreview :code="ErrorExampleCode">
  <ErrorExample />
</ExamplePreview>

### 垂直的

<ExamplePreview :code="VerticalExampleCode">
  <VerticalExample />
</ExamplePreview>
