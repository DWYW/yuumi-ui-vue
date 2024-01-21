<script setup>
import BaseExample from "../../examples/alert/base.vue"
import BaseExampleCode from "../../examples/alert/base.vue?raw"

import HalfExample from "../../examples/alert/half.vue"
import HalfExampleCode from "../../examples/alert/half.vue?raw"

import CustomExample from "../../examples/alert/custom.vue"
import CustomExampleCode from "../../examples/alert/custom.vue?raw"

import StopPenetrateExample from "../../examples/alert/stop-penetrate.vue"
import StopPenetrateExampleCode from "../../examples/alert/stop-penetrate.vue?raw"

import CenterExample from "../../examples/alert/center.vue"
import CenterExampleCode from "../../examples/alert/center.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 部分显示

<ExamplePreview :code="HalfExampleCode">
  <HalfExample />
</ExamplePreview>

### 自定义显示

<ExamplePreview :code="CustomExampleCode">
  <CustomExample />
</ExamplePreview>

### 阻止穿透

<ExamplePreview :code="StopPenetrateExampleCode">
  <StopPenetrateExample />
</ExamplePreview>

### 居中显示

<ExamplePreview :code="CenterExampleCode">
  <CenterExample />
</ExamplePreview>
