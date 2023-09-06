<template>
  <YuumiTimePicker
    v-model="value"
    style="margin: 0 10px 10px 0;"
    @change="onChange"
  />
  <YuumiTimePicker
    v-model="value1"
    style="margin: 0 10px 10px 0;"
    @change="onChange"
  />
</template>

<script>
export default {
  data () {
    return {
      value: new Date('Thu Sep 09 2021 17:05:04 GMT+0800 (中国标准时间)'),
      value1: null
    }
  },
  methods: {
    onChange (detail) {
      console.log("onChange", detail)
    }
  }
}
</script>
