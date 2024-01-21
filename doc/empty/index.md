<script setup>
import BaseExample from "../../examples/empty/base.vue"
import BaseExampleCode from "../../examples/empty/base.vue?raw"

import CustomImageExample from "../../examples/empty/custom-image.vue"
import CustomImageExampleCode from "../../examples/empty/custom-image.vue?raw"

import SlotExample from "../../examples/empty/slot.vue"
import SlotExampleCode from "../../examples/empty/slot.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 自定义图片

`image-size` 与 `image` 配合自定义显示。

<ExamplePreview :code="CustomImageExampleCode">
  <CustomImageExample />
</ExamplePreview>

### 利用插槽添加额外内容

<ExamplePreview :code="SlotExampleCode">
  <SlotExample />
</ExamplePreview>
