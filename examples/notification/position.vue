<template>
  <div>
    <YuumiButton
      style="margin: 0 10px 10px 0;"
      @click="createNotification('tl')"
    >
      top left
    </YuumiButton>
    <YuumiButton
      style="margin: 0 10px 10px 0;"
      @click="createNotification('tr')"
    >
      top right
    </YuumiButton>
  </div>
  <div>
    <YuumiButton
      style="margin: 0 10px 10px 0;"
      @click="createNotification('bl')"
    >
      bottom left
    </YuumiButton>
    <YuumiButton
      style="margin: 0 10px 10px 0;"
      @click="createNotification('br')"
    >
      bottom right
    </YuumiButton>
  </div>
</template>

<script>
export default {
  methods: {
    createNotification (direction) {
      this.$yuumi.createNotification({
        direction,
        title: '选择位置',
        message: '选择位置'
      })
    }
  }
}
</script>