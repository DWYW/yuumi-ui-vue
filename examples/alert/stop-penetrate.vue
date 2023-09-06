<template>
  <YuumiButton
    style="margin: 0 10px 10px 0;"
    @click="showAlert()"
  >
    阻止穿透
  </YuumiButton>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        stopPenetrate: true,
        title: '阻止穿透',
        content: '阻止穿透'
      })
    }
  }
}
</script>