<script setup>
import DirectiveExample from "../../examples/loading/directive.vue"
import DirectiveExampleCode from "../../examples/loading/directive.vue?raw"

import GlobalExample from "../../examples/loading/global.vue"
import GlobalExampleCode from "../../examples/loading/global.vue?raw"

import CustomExample from "../../examples/loading/custom.vue"
import CustomExampleCode from "../../examples/loading/custom.vue?raw"
</script>

### 局部加载

<ExamplePreview :code="DirectiveExampleCode">
  <DirectiveExample />
</ExamplePreview>

### 全局加载

<ExamplePreview :code="GlobalExampleCode">
  <GlobalExample />
</ExamplePreview>

### 自定义loading

<ExamplePreview :code="CustomExampleCode">
  <CustomExample />
</ExamplePreview>
