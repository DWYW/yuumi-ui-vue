<template>
  <div style="margin: 0 10px 10px 0; display: flex; align-items: center">
    <span>只显示主科</span>
    <YuumiSwitch v-model="onlyShowMain" size="sm" />

    <span style="margin-left: 20px">显示总计</span>
    <YuumiSwitch v-model="showSummary" size="sm" />
  </div>
  <div style="height: 530px">
    <YuumiTable :data="studentScore" border summary :summary-method="getAverages">
      <YuumiTableColumn title="姓名" prop="name" fixed="left" />
      <YuumiTableColumn :width="150" title="语文" prop="chinese" />
      <YuumiTableColumn :width="150" title="数学" prop="math" />
      <YuumiTableColumn :width="150" title="英语" prop="english" />

      <template v-if="!onlyShowMain">
        <YuumiTableColumn :width="150" title="物理" prop="physics" />
        <YuumiTableColumn :width="150" title="化学" prop="chemistry" />
        <YuumiTableColumn :width="150" title="生物" prop="biology" />
      </template>

      <template v-if="showSummary">
        <YuumiTableColumn :width="150" title="总分" prop="summary" fixed="right" align="center">
          <template #header="{ props }">
            <span>{{ props.title }}(班级)</span>
          </template>

          <template #default="{ row, rowIndex, props, content }">
            <div>index: {{ rowIndex }}</div>
            <div>value: {{ row[props.prop] }}</div>
            <YuumiIcon v-if="content > 640" icon="flat-praise" style="color: green" />
          </template>

          <template #footer="{ props, value }">
            班级{{ props.title }} <span>{{ value }}</span>
          </template>
        </YuumiTableColumn>
      </template>
    </YuumiTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      students: [
        {
          name: "张三",
          chinese: 110,
          math: 145,
          english: 136,
          physics: 108,
          chemistry: 97,
          biology: 72
        },
        {
          name: "李四",
          chinese: 114,
          math: 125,
          english: 132,
          physics: 101,
          chemistry: 94,
          biology: 76
        },
        {
          name: "王五",
          chinese: 105,
          math: 132,
          english: 124,
          physics: 90,
          chemistry: 87,
          biology: 78
        },
        {
          name: "小丽",
          chinese: 96,
          math: 115,
          english: 106,
          physics: 98,
          chemistry: 91,
          biology: 70
        },
        {
          name: "小红",
          chinese: 112,
          math: 135,
          english: 113,
          physics: 98,
          chemistry: 87,
          biology: 76
        },
        {
          name: "小明",
          chinese: 105,
          math: 125,
          english: 124,
          physics: 101,
          chemistry: 77,
          biology: 73
        },
        {
          name: "李明",
          chinese: 102,
          math: 135,
          english: 118,
          physics: 99,
          chemistry: 67,
          biology: 72
        },
        {
          name: "韩梅",
          chinese: 100,
          math: 105,
          english: 109,
          physics: 100,
          chemistry: 93,
          biology: 78
        }
      ],
      onlyShowMain: false,
      showSummary: true
    }
  },
  computed: {
    studentScore(): any[] {
      return this.students.map((item: { [key: string]: string | number }) => {
        const projects = Object.entries(item).filter(entry => typeof entry[1] === "number") as [
          string,
          number
        ][]
        item.summary = projects.reduce((acc, [key, value]) => {
          if (this.onlyShowMain) {
            return /chinese|math|english/.test(key) ? acc + value : acc
          } else {
            return /summary/.test(key) ? acc : acc + value
          }
        }, 0)

        return item
      })
    }
  },
  methods: {
    getAverages({ data, columns }: any) {
      const sum: (number | string)[] = Array(columns.length).fill(0)

      data.forEach((row: any) => {
        columns.forEach((column: any, index: number) => {
          if (index == 0) sum[index] = "平均分"

          if (typeof sum[index] !== "number") return

          const itemValue = Number(row[column.props.prop])

          if (itemValue.toString() === "NaN") {
            sum[index] = ""
            return
          }

          (sum[index] as number) += itemValue
        })
      })

      return sum.map(item => {
        if (typeof item !== "number") return item
        return (item / data.length).toFixed(2)
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
