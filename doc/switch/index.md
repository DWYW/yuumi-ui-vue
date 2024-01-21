<script setup>
import BaseExample from "../../examples/switch/base.vue"
import BaseExampleCode from "../../examples/switch/base.vue?raw"

import SizeExample from "../../examples/switch/size.vue"
import SizeExampleCode from "../../examples/switch/size.vue?raw"

import CustomExample from "../../examples/switch/custom.vue"
import CustomExampleCode from "../../examples/switch/custom.vue?raw"

import DisabledExample from "../../examples/switch/disabled.vue"
import DisabledExampleCode from "../../examples/switch/disabled.vue?raw"

import ReadonlyExample from "../../examples/switch/readonly.vue"
import ReadonlyExampleCode from "../../examples/switch/readonly.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 设置大小

可选值为：`xl`、 `lg`、 `md`、 `sm`、 `xm`， 默认值 `md`。

<ExamplePreview :code="SizeExampleCode">
  <SizeExample />
</ExamplePreview>

### 设置颜色和内容

<ExamplePreview :code="CustomExampleCode">
  <CustomExample />
</ExamplePreview>

### 禁用

<ExamplePreview :code="DisabledExampleCode">
  <DisabledExample />
</ExamplePreview>

### 只读

<ExamplePreview :code="ReadonlyExampleCode">
  <ReadonlyExample />
</ExamplePreview>
