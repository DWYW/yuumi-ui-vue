<script setup>
import BaseExample from "../../examples/notification/base.vue"
import BaseExampleCode from "../../examples/notification/base.vue?raw"

import SwitchExample from "../../examples/notification/switch.vue"
import SwitchExampleCode from "../../examples/notification/switch.vue?raw"

import PositionExample from "../../examples/notification/position.vue"
import PositionExampleCode from "../../examples/notification/position.vue?raw"

import VNodeExample from "../../examples/notification/vnode.vue"
import VNodeExampleCode from "../../examples/notification/vnode.vue?raw"

import CustomIconExample from "../../examples/notification/custom-icon.vue"
import CustomIconExampleCode from "../../examples/notification/custom-icon.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 非自动关闭

默认 `3s` 后自动关闭

<ExamplePreview :code="SwitchExampleCode">
  <SwitchExample />
</ExamplePreview>

### 选择位置

<ExamplePreview :code="PositionExampleCode">
  <PositionExample />
</ExamplePreview>

### 使用VNode

<ExamplePreview :code="VNodeExampleCode">
  <VNodeExample />
</ExamplePreview>

### 自定图标

<ExamplePreview :code="CustomIconExampleCode">
  <CustomIconExample />
</ExamplePreview>
