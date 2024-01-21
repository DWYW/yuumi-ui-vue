<template>
  <div>
    <div style="display: flex; align-items: center">
      <div style="flex: 1 1 auto">
        <YuumiSlider
          v-model="value"
          :btn-color="btnColor"
          :background-colors="backgroundColors"
          :colors="colors"
          @change="onChange"
          @changing="onChanging"
        />
      </div>
      <div style="flex: 0 0 60px">
        {{ value }}
      </div>
    </div>

    <div style="display: flex; align-items: center">
      <div style="flex: 1 1 auto">
        <YuumiSlider
          v-model="value"
          :btn-color="btnColor"
          :background-colors="backgroundColors"
          :colors="colors"
          disabled
        />
      </div>
      <div style="flex: 0 0 60px">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnColor: "yellow",
      backgroundColors: ["#f5f5f5", "#888888"],
      colors: ["yellow", "red"],
      value: 50
    }
  },
  methods: {
    onChanging(value) {
      this.btnColor = value > 50 ? "red" : "yellow"
    },
    onChange(value) {
      console.log(value)
    }
  }
}
</script>
