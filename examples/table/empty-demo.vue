<template>
  <div style="margin: 0 0 40px;">
    <YuumiTable :data="students">
      <YuumiTableColumn
        title="姓名"
        prop="name"
        fixed="left"
      />
      <YuumiTableColumn
        :width="120"
        title="语文"
        prop="chinese"
      />
      <YuumiTableColumn
        :width="120"
        title="数学"
        prop="math"
      />
      <YuumiTableColumn
        :width="120"
        title="英语"
        prop="english"
      />
      <YuumiTableColumn
        :width="120"
        title="物理"
        prop="physics"
      />
      <YuumiTableColumn
        :width="120"
        title="化学"
        prop="chemistry"
      />
      <YuumiTableColumn
        :width="120"
        title="生物"
        prop="biology"
      />
      <YuumiTableColumn
        :width="120"
        title="总分"
        prop="summary"
        fixed="right"
        align="center"
      />
    </YuumiTable>
  </div>

  <div>
    <YuumiTable
      :data="students"
      empty-placeholder="这是一个自定义提示"
      border
    >
      <YuumiTableColumn
        title="姓名"
        prop="name"
        fixed="left"
      />
      <YuumiTableColumn
        :width="120"
        title="语文"
        prop="chinese"
      />
      <YuumiTableColumn
        :width="120"
        title="数学"
        prop="math"
      />
      <YuumiTableColumn
        :width="120"
        title="英语"
        prop="english"
      />
      <YuumiTableColumn
        :width="120"
        title="物理"
        prop="physics"
      />
      <YuumiTableColumn
        :width="120"
        title="化学"
        prop="chemistry"
      />
      <YuumiTableColumn
        :width="120"
        title="生物"
        prop="biology"
      />
      <YuumiTableColumn
        :width="120"
        title="总分"
        prop="summary"
        fixed="right"
        align="center"
      />
    </YuumiTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      students: []
    }
  }
})
</script>

<style lang="scss" scoped>
</style>