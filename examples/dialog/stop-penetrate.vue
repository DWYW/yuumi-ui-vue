<template>
  <YuumiButton @click="showDialog"> 阻止穿透 </YuumiButton>

  <YuumiDialog v-model="show" title="dialog title" :stop-penetrate="true">
    <YuumiIcon icon="line-help" />
    <span>阻止穿透</span>
  </YuumiDialog>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    showDialog() {
      this.show = true
    }
  }
}
</script>
