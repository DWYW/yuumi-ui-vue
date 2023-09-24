<template>
  <div style="display: flex; align-items: center;">
    <div style="flex: 1 1 auto;">
      <YuumiSlider
        v-model="value"
        :show-tooltip="false"
        @change="onChange"
      />
    </div>
    <div style="flex: 0 0 60px;">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    }
  }
}
</script>