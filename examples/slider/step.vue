<template>
  <div style="display: flex; align-items: center;">
    <div style="flex: 1 1 auto;">
      <YuumiSlider
        v-model="value"
        :step="10"
        @change="onChange"
      />
    </div>
    <div style="flex: 0 0 60px;">
      {{ value }}
    </div>
  </div>

  <div style="display: flex; align-items: center;">
    <div style="flex: 1 1 auto;">
      <YuumiSlider
        v-model="value"
        :show-stops="true"
        :step="10"
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
      value: 20
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    }
  }
}
</script>