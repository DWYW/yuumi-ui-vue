<template>
  <YuumiSelect
    v-model="value"
    :options="options"
    :option-key="optionKey"
    clearable
    style="margin: 0 10px 10px 0"
    @clear="onClear"
  />
  <span>{{ value }}</span>
</template>

<script>
export default {
  data() {
    return {
      value: "香蕉"
    }
  },
  computed: {
    optionKey() {
      return {
        label: "name",
        value: "text"
      }
    },
    options() {
      return [
        { name: "香蕉", text: "香蕉" },
        { name: "苹果", text: "苹果" },
        { name: "梨", text: "梨" },
        { name: "奇异果", text: "奇异果" },
        { name: "榴莲", text: "榴莲" },
        { name: "芒果", text: "芒果" },
        { name: "橘子", text: "橘子" },
        { name: "樱桃", text: "樱桃" },
        { name: "柚子", text: "柚子" },
        { name: "西瓜", text: "西瓜" },
        { name: "哈密瓜", text: "哈密瓜" }
      ]
    }
  },
  methods: {
    onClear() {
      console.log("on clear console log")
    }
  }
}
</script>
