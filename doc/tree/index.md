<script setup>
import BaseExample from "../../examples/tree/base.vue"
import BaseExampleCode from "../../examples/tree/base.vue?raw"

import InlineExample from "../../examples/tree/inline.vue"
import InlineExampleCode from "../../examples/tree/inline.vue?raw"

import AsyncExample from "../../examples/tree/async.vue"
import AsyncExampleCode from "../../examples/tree/async.vue?raw"

import CheckboxExample from "../../examples/tree/checkbox.vue"
import CheckboxExampleCode from "../../examples/tree/checkbox.vue?raw"

import ExpandIconExample from "../../examples/tree/expand-icon.vue"
import ExpandIconExampleCode from "../../examples/tree/expand-icon.vue?raw"

import CustomNodeExample from "../../examples/tree/custom-node.vue"
import CustomNodeExampleCode from "../../examples/tree/custom-node.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### inline

<ExamplePreview :code="InlineExampleCode">
  <InlineExample />
</ExamplePreview>

### 异步加载

设置 `load-data` 返回 `Promise<node[]>`。

<ExamplePreview :code="AsyncExampleCode">
  <AsyncExample />
</ExamplePreview>

### 不显示checkbox

将 `checkable` 设置为 `false`, 默认为 `true` 。

<ExamplePreview :code="CheckboxExampleCode">
  <CheckboxExample />
</ExamplePreview>

### 不显示expandIcon

将 `expandIconVisible` 设置为 `false`, 默认为 `true` 。

<ExamplePreview :code="ExpandIconExampleCode">
  <ExpandIconExample />
</ExamplePreview>

### 自定义TreeNode

<ExamplePreview :code="CustomNodeExampleCode">
  <CustomNodeExample />
</ExamplePreview>
