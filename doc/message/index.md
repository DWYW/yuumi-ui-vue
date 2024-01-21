<script setup>
import BaseExample from "../../examples/message/base.vue"
import BaseExampleCode from "../../examples/message/base.vue?raw"

import SwitchExample from "../../examples/message/switch.vue"
import SwitchExampleCode from "../../examples/message/switch.vue?raw"

import VNodeExample from "../../examples/message/vnode.vue"
import VNodeExampleCode from "../../examples/message/vnode.vue?raw"

import CustomIconExample from "../../examples/message/custom-icon.vue"
import CustomIconExampleCode from "../../examples/message/custom-icon.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 非自动关闭

<ExamplePreview :code="SwitchExampleCode">
  <SwitchExample />
</ExamplePreview>

### 使用VNode

<ExamplePreview :code="VNodeExampleCode">
  <VNodeExample />
</ExamplePreview>

### 自定义图标

<ExamplePreview :code="CustomIconExampleCode">
  <CustomIconExample />
</ExamplePreview>
