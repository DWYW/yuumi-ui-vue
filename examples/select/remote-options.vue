<template>
  <YuumiSelect
    v-model="sigle"
    filterable
    :fallback-options="defaultValueOptions"
    remote
    :remote-method="optionsPromiseGetter"
    style="margin: 0 10px 0 0"
    @change="log"
  />

  <YuumiSelect
    v-model="multiple"
    :fallback-options="defaultValueOptions"
    remote
    :remote-method="optionsPromiseGetter"
    style="margin: 0 10px 0 0"
    multiple
    @change="log"
  />
</template>

<script>
export default {
  data() {
    return {
      options: [],
      sigle: "苹果",
      multiple: ["苹果"]
    }
  },
  computed: {
    defaultValueOptions() {
      return [{ label: "苹果", value: "苹果" }]
    },
    optionsPromiseGetter() {
      return () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve([
              { label: "香蕉", value: "香蕉" },
              { label: "苹果", value: "苹果" },
              { label: "梨", value: "梨" },
              { label: "奇异果", value: "奇异果" },
              { label: "榴莲", value: "榴莲" },
              { label: "芒果", value: "芒果" },
              { label: "橘子", value: "橘子" },
              { label: "樱桃", value: "樱桃" },
              { label: "柚子", value: "柚子" },
              { label: "西瓜", value: "西瓜" },
              { label: "阳光玫瑰青提", value: "阳光玫瑰青提" },
              { label: "哈密瓜", value: "哈密瓜" }
            ])
          }, 200)
        })
    }
  },
  methods: {
    log(detail) {
      console.log(detail)
    }
  }
}
</script>
