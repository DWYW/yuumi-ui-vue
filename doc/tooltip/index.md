<script setup>
import BaseExample from "../../examples/tooltip/base.vue"
import BaseExampleCode from "../../examples/tooltip/base.vue?raw"

import ThemeExample from "../../examples/tooltip/theme.vue"
import ThemeExampleCode from "../../examples/tooltip/theme.vue?raw"

import SlotExample from "../../examples/tooltip/slot.vue"
import SlotExampleCode from "../../examples/tooltip/slot.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 主题 Theme

<ExamplePreview :code="ThemeExampleCode">
  <ThemeExample />
</ExamplePreview>

### Content 插槽

<ExamplePreview :code="SlotExampleCode">
  <SlotExample />
</ExamplePreview>
