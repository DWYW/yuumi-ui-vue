<template>
  <div class="example">
    <div class="example__preview">
      <slot></slot>
    </div>
    <div class="example__code" :style="{ height }" :ref="_refs.codeEl">
      <pre class="language-html">
        <code class="language-html" v-html="htmlText"></code>
      </pre>
    </div>
    <div class="example__toggle" @click="toggleCode">
      <span v-if="isHidden">显示</span>
      <span v-else>隐藏</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Prism from "prismjs"
import { computed, ref, watch } from "vue"

const props = defineProps<{
  code: string
}>()

const _refs = {
  codeEl: ref()
}

const htmlText = ref("")
watch(
  () => props.code,
  value => {
    htmlText.value = Prism.highlight(value || "", Prism.languages.html, "html")
  },
  { immediate: true }
)

const height = ref("0px")
const isHidden = computed(() => height.value === "0px")

function toggleCode() {
  if (isHidden.value) {
    height.value = `${_refs.codeEl.value.scrollHeight || 20}px`
  } else {
    height.value = "0px"
  }
}
</script>

<style lang="scss" scoped>
.example {
  border: 1px solid #eaeefb;

  &__preview {
    padding: var(--space-horizontal-sm);
    border-bottom: 1px solid #eaeefb;
  }

  &__code {
    white-space: pre-line;
    overflow: hidden;
    transition: height 0.3s;

    > pre {
      margin: 0;
    }
  }

  &__toggle {
    cursor: pointer;
    text-align: center;
    padding: var(--space-horizontal-sm);
    opacity: 0.3;
    &:hover {
      color: var(--color-primary);
      opacity: 1;
    }
  }
}
</style>
