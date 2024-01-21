<template>
  <YuumiRadioGroup v-model="value" block @change="consoleLog">
    <YuumiRadio unique="香蕉"> 香蕉 </YuumiRadio>
    <YuumiRadio unique="苹果"> 苹果 </YuumiRadio>
  </YuumiRadioGroup>
  <div>当前选择的为：{{ value }}</div>
</template>

<script>
export default {
  data() {
    return {
      value: "香蕉"
    }
  },
  methods: {
    consoleLog(value) {
      console.log(value)
    }
  }
}
</script>
