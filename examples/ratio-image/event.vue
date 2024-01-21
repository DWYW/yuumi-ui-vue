<template>
  <div style="display: flex; align-items: center; margin-bottom: 10px">
    <span>图片地址：</span>

    <YuumiInput v-model="image" />
  </div>

  <div style="width: 300px">
    <YuumiRatioImage :image="image" @load="onLoaded" @error="onError" />
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      image: "./images/demo.webp"
    }
  },
  methods: {
    onLoaded(e) {
      console.log(e)
    },
    onError(e) {
      console.log(e)
    }
  }
})
</script>
