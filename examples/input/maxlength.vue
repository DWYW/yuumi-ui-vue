<template>
  <YuumiInput v-model="value" placeholder="maxlength = 5" :maxlength="5" />

  <div>输入的内容为：{{ value }}</div>
</template>
<script>
export default {
  data() {
    return {
      value: "这是一段超出长度的文字"
    }
  }
}
</script>
