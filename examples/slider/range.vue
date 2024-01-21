<template>
  <div style="display: flex; align-items: center">
    <div style="flex: 1 1 auto">
      <YuumiSlider v-model="value" range />
    </div>
    <div style="flex: 0 0 60px">
      {{ value }}
    </div>
  </div>

  <div style="display: flex; align-items: center">
    <div style="flex: 1 1 auto">
      <YuumiSlider v-model="value" range disabled />
    </div>
    <div style="flex: 0 0 60px">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [20, 50]
    }
  }
}
</script>
