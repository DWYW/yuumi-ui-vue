<template>
  <YuumiInput
    v-model="value"
    placeholder="请输入"
    style="margin: 0 10px 10px 0;"
    @keyup="onKeyup"
  />
  <YuumiInput
    v-for="theme in ['primary', 'success', 'error', 'warn']"
    :key="theme"
    v-model="value"
    placeholder="请输入"
    :theme="theme"
    style="margin: 0 10px 10px 0;"
  />
  <div>输入的内容为：{{ value }}</div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onKeyup (e) {
      console.log(e)
    }
  }
}
</script>