<template>
  <YuumiTree
    ref="tree"
    :data="data"
    @checked="onChecked"
    @node-expand="onNodeExpand"
    @node-click="onNodeClick"
  />
  <YuumiButton style="margin-right: 10px" @click="change"> 切换数据 </YuumiButton>
  <YuumiButton style="margin-right: 10px" @click="getTreeData"> 获取数型数据 </YuumiButton>
  <YuumiButton style="margin-right: 10px" @click="getCheckedNodes"> 获取选中的节点 </YuumiButton>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一年级",
          value: 1,
          expand: true,
          children: [
            { label: "1班", value: 101, checked: true },
            {
              label: "2班",
              value: 102,
              disabled: true,
              checked: true,
              children: [
                { label: "实验班", value: 10201 },
                { label: "普通班", value: 10202 }
              ]
            },
            { label: "3班", value: 103 }
          ]
        },
        {
          label: "二年级",
          value: 2,
          expand: true,
          children: [
            { label: "1班", value: 201 },
            { label: "2班", value: 202 }
          ]
        },
        {
          label: "三年级",
          value: 3,
          expand: true,
          children: [
            { label: "1班", value: 301 },
            { label: "2班", value: 302 },
            { label: "3班", value: 303 }
          ]
        }
      ]
    }
  },
  methods: {
    onChecked(detail) {
      console.log("onChecked", detail)
    },
    onNodeExpand(detail) {
      console.log("onNodeExpand", detail)
    },
    onNodeClick(detail) {
      console.log("onNodeClick", detail)
    },
    change() {
      this.data = [
        {
          label: "一年级",
          value: 1,
          expand: true,
          children: [{ label: "1班", value: 101, checked: true }]
        },
        { label: "三年级", value: 3, expand: false, children: [{ label: "1班", value: 301 }] }
      ]
    },
    getTreeData() {
      console.log("tree data", this.$refs.tree.getTreeData())
    },
    getCheckedNodes() {
      console.log("slected nodes", this.$refs.tree.getCheckedNodes())
    }
  }
}
</script>
