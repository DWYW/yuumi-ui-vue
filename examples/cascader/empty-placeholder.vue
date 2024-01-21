<template>
  <YuumiCascader v-model="value" style="margin: 0 10px 10px 0" />

  <YuumiCascader
    v-model="value"
    theme="danger"
    style="margin: 0 10px 10px 0"
    options-empty-placeholder="请设置相关选项"
  />
</template>

<script>
export default {
  data() {
    return {
      value: null
    }
  }
}
</script>
