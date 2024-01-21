<template>
  <div>你最喜欢的水果是？（多选）</div>
  <YuumiCheckboxGroup v-model="value" block @change="consoleLog">
    <YuumiCheckbox unique="A"> A. 香蕉 </YuumiCheckbox>
    <YuumiCheckbox unique="B"> B. 苹果 </YuumiCheckbox>
    <YuumiCheckbox unique="C"> C. 柚子 </YuumiCheckbox>
    <YuumiCheckbox unique="D"> D. 西瓜 </YuumiCheckbox>
  </YuumiCheckboxGroup>
  <div>当前选择的为：{{ value }}</div>
</template>

<script>
export default {
  data() {
    return {
      value: ["A"]
    }
  },
  methods: {
    consoleLog(value) {
      console.log(value)
    }
  }
}
</script>
