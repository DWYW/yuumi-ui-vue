<template>
  <div style="display: flex; align-items: center; margin-bottom: 10px">
    <span>圆角：</span>

    <YuumiInput v-model="radius" :limit="/^\d*$/" />
  </div>

  <div style="width: 300px">
    <YuumiRatioImage :radius="Number(radius)" :image="image" />
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      radius: "8",
      image: "./images/demo.webp"
    }
  }
})
</script>
