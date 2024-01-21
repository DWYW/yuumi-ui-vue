<script setup>
import BaseExample from "../../examples/tabs/base.vue"
import BaseExampleCode from "../../examples/tabs/base.vue?raw"

import CardExample from "../../examples/tabs/card.vue"
import CardExampleCode from "../../examples/tabs/card.vue?raw"

import CustomTabExample from "../../examples/tabs/custom-tab.vue"
import CustomTabExampleCode from "../../examples/tabs/custom-tab.vue?raw"

import PositionExample from "../../examples/tabs/position.vue"
import PositionExampleCode from "../../examples/tabs/position.vue?raw"
</script>

### 基本用法

<ExamplePreview :code="BaseExampleCode">
  <BaseExample />
</ExamplePreview>

### 卡片风格

<ExamplePreview :code="CardExampleCode">
  <CardExample />
</ExamplePreview>

### 自定义标签页

<ExamplePreview :code="CustomTabExampleCode">
  <CustomTabExample />
</ExamplePreview>

### 自定义位置

<ExamplePreview :code="PositionExampleCode">
  <PositionExample />
</ExamplePreview>
