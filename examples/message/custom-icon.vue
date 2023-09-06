<template>
  <YuumiButton @click="createMessage">
    自定义图标
  </YuumiButton>
</template>

<script>
import { h } from 'vue'
import { YuumiIcon } from '../../packages'

export default {
  data () {
    return {
      vnode: null
    }
  },
  methods: {
    createMessage () {
      this.vnode = this.$yuumi.createMessage({
        message: "custom icon",
        icon: h(YuumiIcon, {
          icon: 'line-shield-info'
        })
      })
    }
  }
}
</script>