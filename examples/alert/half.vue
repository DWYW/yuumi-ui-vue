<template>
  <YuumiButton style="margin: 0 10px 10px 0" @click="showAlert({ closeEnable: false })">
    不显示关闭
  </YuumiButton>
  <YuumiButton style="margin: 0 10px 10px 0" @click="showAlert({ cancelEnable: false })">
    不显示取消
  </YuumiButton>
  <YuumiButton style="margin: 0 10px 10px 0" @click="showAlert({ confirmEnable: false })">
    不显示确认
  </YuumiButton>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    showAlert(options) {
      this.$yuumi.createAlert({
        ...options,
        title: "部分显示",
        content: "部分显示"
      })
    }
  }
}
</script>
