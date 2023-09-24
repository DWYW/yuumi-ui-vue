<template>
  <YuumiInput
    v-model="value"
    placeholder="一键清除"
    clearable
    style="width: 100%;"
  />
</template>
<script>
export default {
  data () {
    return {
      value: '这是一段测试文字'
    }
  }
}
</script>