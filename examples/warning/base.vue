<template>
  <YuumiWarning style="margin: 0 10px 10px 0">
    <YuumiIcon icon="line-help" style="vertical-align: middle" /> <span>default message</span>
  </YuumiWarning>

  <template v-for="theme in ['primary', 'success', 'warn', 'danger']" :key="theme">
    <YuumiWarning style="margin: 0 10px 10px 0" :theme="theme">
      <YuumiIcon :icon="icon[theme]" style="vertical-align: middle" />
      <span>{{ theme }} message</span>
    </YuumiWarning>
  </template>
</template>

<script>
export default {
  computed: {
    icon() {
      return {
        primary: "line-help",
        warn: "line-info",
        success: "line-circle-correct",
        danger: "line-circle-close"
      }
    }
  }
}
</script>
