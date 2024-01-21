<script setup>
import BaseExample from "../../examples/checkbox/base.vue"
import BaseExampleCode from "../../examples/checkbox/base.vue?raw"

import SizeExample from "../../examples/checkbox/size.vue"
import SizeExampleCode from "../../examples/checkbox/size.vue?raw"

import DisabledExample from "../../examples/checkbox/disabled.vue"
import DisabledExampleCode from "../../examples/checkbox/disabled.vue?raw"

import CustomExample from "../../examples/checkbox/custom.vue"
import CustomExampleCode from "../../examples/checkbox/custom.vue?raw"

import GroupBaseExample from "../../examples/checkbox/group.vue"
import GroupBaseExampleCode from "../../examples/checkbox/group.vue?raw"

import GroupDisabledExample from "../../examples/checkbox/group-disabled.vue"
import GroupDisabledExampleCode from "../../examples/checkbox/group-disabled.vue?raw"

import IndeterminateExample from "../../examples/checkbox/indeterminate.vue"
import IndeterminateExampleCode from "../../examples/checkbox/indeterminate.vue?raw"

import GroupBlockExample from "../../examples/checkbox/group-block.vue"
import GroupBlockExampleCode from "../../examples/checkbox/group-block.vue?raw"
</script>

## checkbox 复选框

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
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

### 更改图标

<ExamplePreview :code="CustomExampleCode">
  <CustomExample />
</ExamplePreview>

## checkbox-group 复选组

### 基本用法

<ExamplePreview :code="GroupBaseExampleCode">
  <GroupBaseExample />
</ExamplePreview>

### 禁用

<ExamplePreview :code="GroupDisabledExampleCode">
  <GroupDisabledExample />
</ExamplePreview>

### 中间状态

可以通过 `indeterminateIcon` 设置中间态的icon。

<ExamplePreview :code="IndeterminateExampleCode">
  <IndeterminateExample />
</ExamplePreview>

### block

<ExamplePreview :code="GroupBlockExampleCode">
  <GroupBlockExample />
</ExamplePreview>
