<template>
  <template v-for="theme in ['default', 'primary', 'success', 'warn', 'danger']" :key="theme">
    <YuumiButton style="margin: 0 10px 10px 0" :theme="theme" @click="createMessage(theme)">
      {{ theme }} message
    </YuumiButton>
  </template>
</template>

<script>
export default {
  methods: {
    createMessage(theme) {
      this.$yuumi.createMessage({
        message: "this is a message",
        theme: theme
      })
    }
  }
}
</script>
