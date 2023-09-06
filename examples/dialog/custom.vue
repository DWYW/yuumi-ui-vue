<template>
  <YuumiButton @click="showDialog">
    自定义按钮文字
  </YuumiButton>
  <YuumiDialog
    v-model="show"
    title="dialog title"
    cancel-text="撤销"
    confirm-text="保存"
  >
    <YuumiIcon icon="line-help" />
    <span>自定义按钮文字</span>
  </YuumiDialog>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showDialog () {
      this.show = true
    }
  }
}
</script>