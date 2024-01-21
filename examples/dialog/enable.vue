<template>
  <YuumiButton style="margin: 0 10px 10px 0" @click="showDialog({ closeEnable: false })">
    不显示关闭
  </YuumiButton>
  <YuumiButton style="margin: 0 10px 10px 0" @click="showDialog({ cancelEnable: false })">
    不显示取消
  </YuumiButton>
  <YuumiButton style="margin: 0 10px 10px 0" @click="showDialog({ confirmEnable: false })">
    不显示确认
  </YuumiButton>
  <YuumiButton
    style="margin: 0 10px 10px 0"
    @click="showDialog({ cancelEnable: false, confirmEnable: false })"
  >
    不显示取消和确认
  </YuumiButton>

  <YuumiDialog v-model="show" title="dialog title" v-bind="enable">
    <YuumiIcon icon="line-help" />
    <span>部分显示</span>
  </YuumiDialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      enable: null
    }
  },
  methods: {
    showDialog(options) {
      this.enable = options
      this.show = true
    }
  }
}
</script>
