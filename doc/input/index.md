<script setup>
import BaseExample from "../../examples/input/base.vue"
import BaseExampleCode from "../../examples/input/base.vue?raw"

import AutoFocusExample from "../../examples/input/auto-focus.vue"
import AutoFocusExampleCode from "../../examples/input/auto-focus.vue?raw"

import MaxlengthExample from "../../examples/input/maxlength.vue"
import MaxlengthExampleCode from "../../examples/input/maxlength.vue?raw"

import SizeExample from "../../examples/input/size.vue"
import SizeExampleCode from "../../examples/input/size.vue?raw"

import DisabledExample from "../../examples/input/disabled.vue"
import DisabledExampleCode from "../../examples/input/disabled.vue?raw"

import ReadonlyExample from "../../examples/input/readonly.vue"
import ReadonlyExampleCode from "../../examples/input/readonly.vue?raw"

import LimitExample from "../../examples/input/limit.vue"
import LimitExampleCode from "../../examples/input/limit.vue?raw"

import ClearExample from "../../examples/input/clear.vue"
import ClearExampleCode from "../../examples/input/clear.vue?raw"

import SlotExample from "../../examples/input/slot.vue"
import SlotExampleCode from "../../examples/input/slot.vue?raw"

import RoundExample from "../../examples/input/round.vue"
import RoundExampleCode from "../../examples/input/round.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 自动获取焦点 autoFocus

<ExamplePreview :code="AutoFocusExampleCode">
  <AutoFocusExample />
</ExamplePreview>

### 设置最大输入长度 maxlength

<ExamplePreview :code="MaxlengthExampleCode">
  <MaxlengthExample />
</ExamplePreview>

### 大小设置 size

可选值 `xl`、`lg`、`md`、`sm`、`xm`，默认为 `md`。

<ExamplePreview :code="SizeExampleCode">
  <SizeExample />
</ExamplePreview>

### 禁用 disabled

<ExamplePreview :code="DisabledExampleCode">
  <DisabledExample />
</ExamplePreview>

### 只读 readonly

<ExamplePreview :code="ReadonlyExampleCode">
  <ReadonlyExample />
</ExamplePreview>

### 限制输入 limit

<ExamplePreview :code="LimitExampleCode">
  <LimitExample />
</ExamplePreview>

### 一键清除

<ExamplePreview :code="ClearExampleCode">
  <ClearExample />
</ExamplePreview>

### 插槽使用

使用 `prefixIcon`, `suffixIcon`, `prefix`, `suffix` 插槽实现更多功能

<ExamplePreview :code="SlotExampleCode">
  <SlotExample />
</ExamplePreview>

### 圆角

<ExamplePreview :code="RoundExampleCode">
  <RoundExample />
</ExamplePreview>
