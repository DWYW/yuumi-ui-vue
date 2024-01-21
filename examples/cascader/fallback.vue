<template>
  <YuumiCascader
    v-model="value"
    :options="options"
    :fallback-options="fallbackOptions"
    style="margin: 0 10px 10px 0"
  />
  {{ value }}
</template>

<script>
export default {
  data() {
    return {
      value: ["002", "002001"],
      options: [
        {
          label: "北京",
          value: "001",
          children: [
            { label: "东城区", value: "001001" },
            { label: "西城区", value: "001002" },
            { label: "朝阳区", value: "001003" },
            { label: "海淀区", value: "001004" },
            { label: "丰台区", value: "001005" }
          ]
        }
      ],
      fallbackOptions: [
        { label: "上海", value: "002", children: [{ label: "黄浦区", value: "002001" }] }
      ]
    }
  }
}
</script>
