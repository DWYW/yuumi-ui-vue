<script setup>
import BaseExample from "../../examples/select/base.vue"
import BaseExampleCode from "../../examples/select/base.vue?raw"

import SizeExample from "../../examples/select/size.vue"
import SizeExampleCode from "../../examples/select/size.vue?raw"

import MultipleExample from "../../examples/select/multiple.vue"
import MultipleExampleCode from "../../examples/select/multiple.vue?raw"

import DisabledExample from "../../examples/select/disabled.vue"
import DisabledExampleCode from "../../examples/select/disabled.vue?raw"

import ReadonlyExample from "../../examples/select/readonly.vue"
import ReadonlyExampleCode from "../../examples/select/readonly.vue?raw"

import InitOptionExample from "../../examples/select/init-option.vue"
import InitOptionExampleCode from "../../examples/select/init-option.vue?raw"

import SearchExample from "../../examples/select/search.vue"
import SearchExampleCode from "../../examples/select/search.vue?raw"

import ClearExample from "../../examples/select/clear.vue"
import ClearExampleCode from "../../examples/select/clear.vue?raw"

import OptionKeyExample from "../../examples/select/option-key.vue"
import OptionKeyExampleCode from "../../examples/select/option-key.vue?raw"

import EmptyPlaceholderExample from "../../examples/select/empty-placeholder.vue"
import EmptyPlaceholderExampleCode from "../../examples/select/empty-placeholder.vue?raw"

import AsyncOptionsExample from "../../examples/select/async-options.vue"
import AsyncOptionsExampleCode from "../../examples/select/async-options.vue?raw"
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

### 多选

<ExamplePreview :code="MultipleExampleCode">
  <MultipleExample />
</ExamplePreview>

### 禁用

<ExamplePreview :code="DisabledExampleCode">
  <DisabledExample />
</ExamplePreview>

### 只读

<ExamplePreview :code="ReadonlyExampleCode">
  <ReadonlyExample />
</ExamplePreview>

### 初始值不包含在下拉选择项中

<ExamplePreview :code="InitOptionExampleCode">
  <InitOptionExample />
</ExamplePreview>

### 单选模式下可搜索

<ExamplePreview :code="SearchExampleCode">
  <SearchExample />
</ExamplePreview>

### 可清除

<ExamplePreview :code="ClearExampleCode">
  <ClearExample />
</ExamplePreview>

### 映射

<ExamplePreview :code="OptionKeyExampleCode">
  <OptionKeyExample />
</ExamplePreview>

### 空选项的提示词

<ExamplePreview :code="EmptyPlaceholderExampleCode">
  <EmptyPlaceholderExample />
</ExamplePreview>

### 异步选项

<ExamplePreview :code="AsyncOptionsExampleCode">
  <AsyncOptionsExample />
</ExamplePreview>
