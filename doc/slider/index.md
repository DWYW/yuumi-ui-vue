<script setup>
import BaseExample from "../../examples/slider/base.vue"
import BaseExampleCode from "../../examples/slider/base.vue?raw"

import StepExample from "../../examples/slider/step.vue"
import StepExampleCode from "../../examples/slider/step.vue?raw"

import ScopeExample from "../../examples/slider/scope.vue"
import ScopeExampleCode from "../../examples/slider/scope.vue?raw"

import TooltipExample from "../../examples/slider/tooltip.vue"
import TooltipExampleCode from "../../examples/slider/tooltip.vue?raw"

import FormatterExample from "../../examples/slider/formatter.vue"
import FormatterExampleCode from "../../examples/slider/formatter.vue?raw"

import CustomExample from "../../examples/slider/custom.vue"
import CustomExampleCode from "../../examples/slider/custom.vue?raw"

import RangeExample from "../../examples/slider/range.vue"
import RangeExampleCode from "../../examples/slider/range.vue?raw"

import VerticalExample from "../../examples/slider/vertical.vue"
import VerticalExampleCode from "../../examples/slider/vertical.vue?raw"

import ReverseExample from "../../examples/slider/reverse.vue"
import ReverseExampleCode from "../../examples/slider/reverse.vue?raw"

import PlacementExample from "../../examples/slider/placement.vue"
import PlacementExampleCode from "../../examples/slider/placement.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 设置步长

<ExamplePreview :code="StepExampleCode">
  <StepExample />
</ExamplePreview>

### 设置最大值/最小值

<ExamplePreview :code="ScopeExampleCode">
  <ScopeExample />
</ExamplePreview>

### 隐藏tooltip

<ExamplePreview :code="TooltipExampleCode">
  <TooltipExample />
</ExamplePreview>

### 自定义显示

<ExamplePreview :code="FormatterExampleCode">
  <FormatterExample />
</ExamplePreview>

### 自定义颜色

<ExamplePreview :code="CustomExampleCode">
  <CustomExample />
</ExamplePreview>

### 选择范围

<ExamplePreview :code="RangeExampleCode">
  <RangeExample />
</ExamplePreview>

### 垂直模式

<ExamplePreview :code="VerticalExampleCode">
  <VerticalExample />
</ExamplePreview>

### 反转模式

<ExamplePreview :code="ReverseExampleCode">
  <ReverseExample />
</ExamplePreview>

### 设置tooltip位置

可选值

`auto`, `auto-start`, `auto-end`

`top`, `top-start`, `top-end`

`bottom`, `bottom-start`, `bottom-end`

`right`, `right-start`, `right-end`

`left`, `left-start`, `left-end`

默认值为 `top|right`

<ExamplePreview :code="PlacementExampleCode">
  <PlacementExample />
</ExamplePreview>
