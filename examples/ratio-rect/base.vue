<template>
  <YuumiInput
    v-model="ratio"
    :limit="/^\d+(\.\d*)?$/"
  />
  <div style="width: 300px;">
    <YuumiRatioRect
      :ratio="ratio"
      style="background-color: blue; border-radius: 4px; display: flex; justify-content: center; align-items: center; color: #ffffff;"
    >
      ratio: {{ ratio }}
    </YuumiRatioRect>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
 data() {
  return {
    ratio: 1
  }
 }
})
</script>