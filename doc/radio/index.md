<script setup>
import BaseExample from "../../examples/radio/base.vue"
import BaseExampleCode from "../../examples/radio/base.vue?raw"

import SizeExample from "../../examples/radio/size.vue"
import SizeExampleCode from "../../examples/radio/size.vue?raw"

import DisabledExample from "../../examples/radio/disabled.vue"
import DisabledExampleCode from "../../examples/radio/disabled.vue?raw"

import IconExample from "../../examples/radio/icon.vue"
import IconExampleCode from "../../examples/radio/icon.vue?raw"

import GroupExample from "../../examples/radio/group.vue"
import GroupExampleCode from "../../examples/radio/group.vue?raw"

import GroupDisabledExample from "../../examples/radio/group-disabled.vue"
import GroupDisabledExampleCode from "../../examples/radio/group-disabled.vue?raw"

import GroupBlockExample from "../../examples/radio/group-block.vue"
import GroupBlockExampleCode from "../../examples/radio/group-block.vue?raw"
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

### 禁用

<ExamplePreview :code="DisabledExampleCode">
  <DisabledExample />
</ExamplePreview>

### 更改图标

<ExamplePreview :code="IconExampleCode">
  <IconExample />
</ExamplePreview>

### 单选组 - 基本用法

<ExamplePreview :code="GroupExampleCode">
  <GroupExample />
</ExamplePreview>

### 单选组 - 禁用

<ExamplePreview :code="GroupDisabledExampleCode">
  <GroupDisabledExample />
</ExamplePreview>

### 单选组 - block

<ExamplePreview :code="GroupBlockExampleCode">
  <GroupBlockExample />
</ExamplePreview>
