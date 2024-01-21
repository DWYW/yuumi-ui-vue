<template>
  <div style="overflow: hidden">
    <div style="display: flex; align-items: center; margin-bottom: 10px">
      <div style="margin-right: 10px">默认头像</div>
      <YuumiInput v-model="avatar_default" />
    </div>

    <div style="display: flex; align-items: center; margin-bottom: 10px">
      <div style="margin-right: 10px">显示头像</div>
      <YuumiInput v-model="avatar" />
    </div>

    <div style="width: 100px">
      <YuumiRatioImage :radius="16" :image="avatar" :placeholder-image="avatar_default" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      avatar_default: "./images/avatar.webp",
      avatar: "./images/demo.webp"
    }
  }
})
</script>
