<script setup>
import BaseExample from "../../examples/time-picker/base.vue"
import BaseExampleCode from "../../examples/time-picker/base.vue?raw"

import RangeExample from "../../examples/time-picker/range.vue"
import RangeExampleCode from "../../examples/time-picker/range.vue?raw"

import SizeExample from "../../examples/time-picker/size.vue"
import SizeExampleCode from "../../examples/time-picker/size.vue?raw"

import DisabledExample from "../../examples/time-picker/disabled.vue"
import DisabledExampleCode from "../../examples/time-picker/disabled.vue?raw"

import ClearExample from "../../examples/time-picker/clear.vue"
import ClearExampleCode from "../../examples/time-picker/clear.vue?raw"

import FormatExample from "../../examples/time-picker/format.vue"
import FormatExampleCode from "../../examples/time-picker/format.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 范围选择

<ExamplePreview :code="RangeExampleCode">
  <RangeExample />
</ExamplePreview>

### 设置大小

可选值为：`xl`、 `lg`、 `md`、 `sm`、 `xm`， 默认值 `md`。

<ExamplePreview :code="SizeExampleCode">
  <SizeExample />
</ExamplePreview>

### 禁用

<ExamplePreview :code="DisabledExampleCode">
  <DisabledExample />
</ExamplePreview>

### 可清除

<ExamplePreview :code="ClearExampleCode">
  <ClearExample />
</ExamplePreview>

### 其他格式

<ExamplePreview :code="FormatExampleCode">
  <FormatExample />
</ExamplePreview>
