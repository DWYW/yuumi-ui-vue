<script setup>
import BaseExample from "../../examples/dialog/base.vue"
import BaseExampleCode from "../../examples/dialog/base.vue?raw"

import EnableExample from "../../examples/dialog/enable.vue"
import EnableExampleCode from "../../examples/dialog/enable.vue?raw"

import CustomExample from "../../examples/dialog/custom.vue"
import CustomExampleCode from "../../examples/dialog/custom.vue?raw"

import AsyncExample from "../../examples/dialog/async.vue"
import AsyncExampleCode from "../../examples/dialog/async.vue?raw"

import ListenersExample from "../../examples/dialog/listeners.vue"
import ListenersExampleCode from "../../examples/dialog/listeners.vue?raw"

import StopPenetrateExample from "../../examples/dialog/stop-penetrate.vue"
import StopPenetrateExampleCode from "../../examples/dialog/stop-penetrate.vue?raw"

import CustomVNodeExample from "../../examples/dialog/custom-vnode.vue"
import CustomVNodeExampleCode from "../../examples/dialog/custom-vnode.vue?raw"

import CustomWidthExample from "../../examples/dialog/custom-width.vue"
import CustomWidthExampleCode from "../../examples/dialog/custom-width.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 部分显示

<ExamplePreview :code="EnableExampleCode">
  <EnableExample />
</ExamplePreview>

### 自定义按钮文字

<ExamplePreview :code="CustomExampleCode">
  <CustomExample />
</ExamplePreview>

### 异步操作

<ExamplePreview :code="AsyncExampleCode">
  <AsyncExample />
</ExamplePreview>

### 事件监听

`close`、`cancel`、`confirm`、`beforeEnter`、`afterEnter`、`beforeLeave`、`afterLeave`

<ExamplePreview :code="ListenersExampleCode">
  <ListenersExample />
</ExamplePreview>

### 阻止穿透

阻止 window 的滚动

<ExamplePreview :code="StopPenetrateExampleCode">
  <StopPenetrateExample />
</ExamplePreview>

### 自定义标题VNode

<ExamplePreview :code="CustomVNodeExampleCode">
  <CustomVNodeExample />
</ExamplePreview>

### 自定义宽度

<ExamplePreview :code="CustomWidthExampleCode">
  <CustomWidthExample />
</ExamplePreview>
