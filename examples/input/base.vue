<template>
  <YuumiInput
    v-model="value"
    placeholder="请输入"
    style="margin: 0 10px 10px 0"
    @change="onChange"
  />
  <div>输入的内容为：{{ value }}</div>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    }
  },
  methods: {
    onChange(e) {
      console.log(e)
    }
  }
}
</script>
