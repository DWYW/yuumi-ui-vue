<template>
  <div style="display: flex; align-items: center; margin-bottom: 10px;">
    <span>宽/高：</span>

    <YuumiInput
      v-model="ratio"
      :limit="/^\d+(\.\d*)?$/"
    />
  </div>

  <div style="width: 300px;">
    <YuumiRatioImage
      :ratio="ratio"
      :image="image"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
 data() {
  return {
    ratio: 1.07,
    image: "/demo.webp"
  }
 }
})
</script>