<template>
  <YuumiTree :data="data">
    <template #default="{ node, isLeaf }">
      <YuumiIcon :icon="node.icon" />
      <span>{{ node.label }}</span>
      <YuumiIcon v-if="!isLeaf" icon="line-arrow-right"></YuumiIcon>
    </template>
  </YuumiTree>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          icon: "line-calendar",
          label: "2021-12-11",
          value: "2021-12-11",
          children: [
            { icon: "line-clock", label: "06:00", value: "2021-12-11 06:00:00" },
            { icon: "line-clock", label: "08:00", value: "2021-12-11 08:00:00" },
            { icon: "line-clock", label: "10:00", value: "2021-12-11 10:00:00" }
          ]
        },
        {
          icon: "line-calendar",
          label: "2021-12-12",
          value: "2021-12-12",
          children: [
            { icon: "line-clock", label: "06:00", value: "2021-12-12 06:00:00" },
            { icon: "line-clock", label: "08:00", value: "2021-12-12 08:00:00" },
            { icon: "line-clock", label: "10:00", value: "2021-12-12 10:00:00" }
          ]
        }
      ]
    }
  }
}
</script>
