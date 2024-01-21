<template>
  <div style="display: flex; align-items: center">
    <div style="flex: 1 1 auto">
      <YuumiSlider v-model="value" :formatter="formatter" @change="onChange" />
    </div>
    <div style="flex: 0 0 60px">
      {{ formatter(value) }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 10
    }
  },
  methods: {
    formatter(value) {
      return (value / 100).toFixed(2)
    },
    onChange(value) {
      console.log(value)
    }
  }
}
</script>
