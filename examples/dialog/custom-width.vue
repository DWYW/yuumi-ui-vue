<template>
  <YuumiButton @click="showDialog"> 自定义宽度 </YuumiButton>

  <YuumiDialog v-model="show" title="自定义宽度" width="900px" />
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
