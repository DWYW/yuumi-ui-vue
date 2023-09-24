<template>
  <YuumiInput
    v-model="value"
    placeholder="maxlength = 5"
    :maxlength="5"
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