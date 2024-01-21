<template>
  <YuumiButton @click="showDialog"> show dialog </YuumiButton>
  <YuumiDialog
    v-model="show"
    title="dialog title"
    @close="onclose"
    @cancel="oncancel"
    @confirm="onconfirm"
  >
    <YuumiIcon icon="line-help" />
    <span>基本用法</span>
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
    },
    onclose() {
      console.log("on close")
    },
    oncancel() {
      console.log("on cancel")
    },
    onconfirm() {
      console.log("on confirm")
    }
  }
}
</script>
