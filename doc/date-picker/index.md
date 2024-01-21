<script setup>
import BaseExample from "../../examples/date-picker/base.vue"
import BaseExampleCode from "../../examples/date-picker/base.vue?raw"

import TypeExample from "../../examples/date-picker/type.vue"
import TypeExampleCode from "../../examples/date-picker/type.vue?raw"

import DisabledExample from "../../examples/date-picker/disabled.vue"
import DisabledExampleCode from "../../examples/date-picker/disabled.vue?raw"

import DisabledDateExample from "../../examples/date-picker/disable-date.vue"
import DisabledDateExampleCode from "../../examples/date-picker/disable-date.vue?raw"

import DisabledTimeExample from "../../examples/date-picker/disable-time.vue"
import DisabledTimeExampleCode from "../../examples/date-picker/disable-time.vue?raw"

import ClearExample from "../../examples/date-picker/clear.vue"
import ClearExampleCode from "../../examples/date-picker/clear.vue?raw"

import MaxdaysExample from "../../examples/date-picker/maxdays.vue"
import MaxdaysExampleCode from "../../examples/date-picker/maxdays.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 范围选择

<ExamplePreview :code="TypeExampleCode">
  <TypeExample />
</ExamplePreview>

### 禁用

<ExamplePreview :code="DisabledExampleCode">
  <DisabledExample />
</ExamplePreview>

### 禁用日期

<ExamplePreview :code="DisabledDateExampleCode">
  <DisabledDateExample />
</ExamplePreview>

### 禁用时间

<ExamplePreview :code="DisabledTimeExampleCode">
  <DisabledTimeExample />
</ExamplePreview>

### 一键清除

<ExamplePreview :code="ClearExampleCode">
  <ClearExample />
</ExamplePreview>

### 最长天数

<ExamplePreview :code="MaxdaysExampleCode">
  <MaxdaysExample />
</ExamplePreview>
