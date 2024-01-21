<script setup>
import BaseExample from "../../examples/cascader/base.vue"
import BaseExampleCode from "../../examples/cascader/base.vue?raw"

import SizeExample from "../../examples/cascader/size.vue"
import SizeExampleCode from "../../examples/cascader/size.vue?raw"

import EveryExample from "../../examples/cascader/every.vue"
import EveryExampleCode from "../../examples/cascader/every.vue?raw"

import DisabledExample from "../../examples/cascader/disabled.vue"
import DisabledExampleCode from "../../examples/cascader/disabled.vue?raw"

import ReadonlyExample from "../../examples/cascader/readonly.vue"
import ReadonlyExampleCode from "../../examples/cascader/readonly.vue?raw"

import CustomExample from "../../examples/cascader/custom.vue"
import CustomExampleCode from "../../examples/cascader/custom.vue?raw"

import ClearExample from "../../examples/cascader/clear.vue"
import ClearExampleCode from "../../examples/cascader/clear.vue?raw"

import EmptyPlaceholderExample from "../../examples/cascader/empty-placeholder.vue"
import EmptyPlaceholderExampleCode from "../../examples/cascader/empty-placeholder.vue?raw"

import FallbackExample from "../../examples/cascader/fallback.vue"
import FallbackExampleCode from "../../examples/cascader/fallback.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 大小

<ExamplePreview :code="SizeExampleCode">
  <SizeExample />
</ExamplePreview>

### 选择即变化

<ExamplePreview :code="EveryExampleCode">
  <EveryExample />
</ExamplePreview>

### 禁用

<ExamplePreview :code="DisabledExampleCode">
  <DisabledExample />
</ExamplePreview>

### 只读

<ExamplePreview :code="ReadonlyExampleCode">
  <ReadonlyExample />
</ExamplePreview>

### 自定义显示

<ExamplePreview :code="CustomExampleCode">
  <CustomExample />
</ExamplePreview>

### 一键清除

<ExamplePreview :code="ClearExampleCode">
  <ClearExample />
</ExamplePreview>

### 空选项的提示词

<ExamplePreview :code="EmptyPlaceholderExampleCode">
  <EmptyPlaceholderExample />
</ExamplePreview>

### 初始值不包含在下拉选择项中

<ExamplePreview :code="FallbackExampleCode">
  <FallbackExample />
</ExamplePreview>
