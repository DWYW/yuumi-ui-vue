<template>
  <div style="display: flex; align-items: center; margin-bottom: 10px;">
    <span>裁剪、缩放：</span>

    <YuumiSelect
      v-model="mode"
      :options="modeOptions"
    />
  </div>

  <div style="width: 300px; background-color: #f5f5f5;">
    <YuumiRatioImage
      :image="image"
      :mode="mode"
    />
  </div>

  <div>
    <p>原始图片</p>
    <img
      :src="image"
      style="width: 100%; height: auto;"
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
 data() {
  return {
    mode: "aspectFill",
    image: "/demo.webp"
  }
 },
 computed: {
  modeOptions() {
    return [
      { value: "scaleToFill", label: "scaleToFill" },
      { value: "aspectFit", label: "aspectFit" },
      { value: "aspectFill", label: "aspectFill" },
      { value: "top", label: "top" },
      { value: "bottom", label: "bottom" },
      { value: "center", label: "center" },
      { value: "left", label: "left" },
      { value: "right", label: "right" },
      { value: "top left", label: "top left" },
      { value: "top right", label: "top right" },
      { value: "bottom left", label: "bottom left" },
      { value: "bottom right", label: "bottom right" }
    ]
  }
 }
})
</script>