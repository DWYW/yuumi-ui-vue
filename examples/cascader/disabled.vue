<template>
  <YuumiCascader
    v-model="value"
    :options="options"
    style="margin: 0 10px 10px 0;"
    placeholder="部分选项不可用"
  />
  <YuumiCascader
    v-model="value"
    :options="options"
    disabled
    style="margin: 0 10px 10px 0;"
    placeholder="disabled"
  />
</template>

<script>
export default {
  data () {
    return {
      value: null,
      options: [
        { label: "北京", value: "001", children: [
          { label: "东城区", value: "001001" },
          { label: "西城区", value: "001002" },
          { label: "朝阳区", value: "001003", disabled: true },
          { label: "海淀区", value: "001004" },
          { label: "丰台区", value: "001005" }
        ]},
        { label: "上海", value: "002", disabled: true, children: [
          { label: "黄浦区", value: "002001" }
        ]}
      ]
    }
  }
}
</script>