<template>
  <YuumiButton style="margin: 0 10px 10px 0" @click="showAlert()"> 居中显示 </YuumiButton>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        alignCenter: true,
        title: "居中显示",
        content: "居中显示"
      })
    }
  }
}
</script>
