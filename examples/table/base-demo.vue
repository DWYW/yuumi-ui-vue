<template>
  <YuumiTable :data="students">
    <template v-for="item in columns" :key="item.prop">
      <YuumiTableColumn :title="item.title" :prop="item.prop" />
    </template>
  </YuumiTable>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      columns: [
        { title: "姓名", prop: "name" },
        { title: "语文", prop: "chinese" },
        { title: "数学", prop: "math" },
        { title: "英语", prop: "english" }
      ],
      students: [
        { name: "Dwayne Johnson", chinese: 0, math: 80, english: 90 },
        { name: "李四", chinese: 86, math: 70, english: 92 },
        { name: "王五", chinese: 96, math: 90, english: 80 },
        { name: "小丽", chinese: 83, math: 89, english: 92 },
        { name: "小红", chinese: 79, math: 99, english: 100 },
        { name: "小明", chinese: 88, math: 80, english: 95 }
      ]
    }
  }
})
</script>

<style lang="scss" scoped></style>
