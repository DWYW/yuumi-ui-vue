<script setup>
import BaseExample from "../../examples/drawer/base.vue"
import BaseExampleCode from "../../examples/drawer/base.vue?raw"

import ListenersExample from "../../examples/drawer/listeners.vue"
import ListenersExampleCode from "../../examples/drawer/listeners.vue?raw"
</script>

### 基本用法

position 可选值为 `top`、 `right`、 `bottom`、 `left`， 默认值 `right`。

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 事件

`before-open`, `after-open`, `before-close`, `after-close`。

<ExamplePreview :code="ListenersExampleCode">
  <ListenersExample />
</ExamplePreview>
