<script setup>
import BaseExample from "../../examples/number-input/base.vue"
import BaseExampleCode from "../../examples/number-input/base.vue?raw"

import RangeExample from "../../examples/number-input/range.vue"
import RangeExampleCode from "../../examples/number-input/range.vue?raw"

import StepExample from "../../examples/number-input/step.vue"
import StepExampleCode from "../../examples/number-input/step.vue?raw"

import SizeExample from "../../examples/number-input/size.vue"
import SizeExampleCode from "../../examples/number-input/size.vue?raw"

import PlacementExample from "../../examples/number-input/placement.vue"
import PlacementExampleCode from "../../examples/number-input/placement.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 设置范围

<ExamplePreview :code="RangeExampleCode">
  <RangeExample />
</ExamplePreview>

### 设置步长

<ExamplePreview :code="StepExampleCode">
  <StepExample />
</ExamplePreview>

### 设置大小

可选值 `xl`、`lg`、`md`、`sm`、`xm`，默认为 `md`。

<ExamplePreview :code="SizeExampleCode">
  <SizeExample />
</ExamplePreview>

### 按钮位置

可选值 `default`、`left`、`right`，默认为 `default`。

<ExamplePreview :code="PlacementExampleCode">
  <PlacementExample />
</ExamplePreview>
