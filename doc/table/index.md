<script setup>
import BaseDemo from "../../examples/table/base-demo.vue"
import BaseDemoCode from "../../examples/table/base-demo.vue?raw"

import StripeDemo from "../../examples/table/stripe-demo.vue"
import StripeDemoCode from "../../examples/table/stripe-demo.vue?raw"

import SizeDemo from "../../examples/table/size-demo.vue"
import SizeDemoCode from "../../examples/table/size-demo.vue?raw"

import CustomStyleDemo from "../../examples/table/custom-style-demo.vue"
import CustomStyleDemoCode from "../../examples/table/custom-style-demo.vue?raw"

import FixedDemo from "../../examples/table/fixed-demo.vue"
import FixedDemoCode from "../../examples/table/fixed-demo.vue?raw"

import SummaryDemo from "../../examples/table/summary-demo.vue"
import SummaryDemoCode from "../../examples/table/summary-demo.vue?raw"

import SelectionDemo from "../../examples/table/selection-demo.vue"
import SelectionDemoCode from "../../examples/table/selection-demo.vue?raw"

import EmptyDemo from "../../examples/table/empty-demo.vue"
import EmptyDemoCode from "../../examples/table/empty-demo.vue?raw"

import SlotsDemo from "../../examples/table/slots-demo.vue"
import SlotsDemoCode from "../../examples/table/slots-demo.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseDemoCode">
  <BaseDemo />
</ExamplePreview>

### 斑马线

<ExamplePreview :code="StripeDemoCode">
  <StripeDemo />
</ExamplePreview>

### 紧凑程度

<ExamplePreview :code="SizeDemoCode">
  <SizeDemo />
</ExamplePreview>

### 自定义样式

通过 `rowClassName` 和 `cellClassName` 实现自定义样式。

<ExamplePreview :code="CustomStyleDemoCode">
  <CustomStyleDemo />
</ExamplePreview>

### 浮动头 和 浮动列

<ExamplePreview :code="FixedDemoCode">
  <FixedDemo />
</ExamplePreview>

### 总结栏

通过 `summary` 和 `summary-method` 实现总结栏。

<ExamplePreview :code="SummaryDemoCode">
  <SummaryDemo />
</ExamplePreview>

### 多选

<ExamplePreview :code="SelectionDemoCode">
  <SelectionDemo />
</ExamplePreview>

### 空表格

<ExamplePreview :code="EmptyDemoCode">
  <EmptyDemo />
</ExamplePreview>

### 使用插槽实现更多

<ExamplePreview :code="SlotsDemoCode">
  <SlotsDemo />
</ExamplePreview>
