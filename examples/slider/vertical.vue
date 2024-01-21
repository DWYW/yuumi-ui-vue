<template>
  <div style="display: flex; justify-content: space-around">
    <div style="flex: 1 1 100px">
      <div style="height: 300px; text-align: center">
        <YuumiSlider v-model="value" vertical @change="onChange" />
      </div>
      <div style="text-align: center">
        {{ value }}
      </div>
    </div>

    <div style="flex: 1 1 100px">
      <div style="height: 300px; text-align: center">
        <YuumiSlider
          v-model="value"
          vertical
          :btn-color="btnColor"
          :background-colors="backgroundColors"
          :colors="colors"
          @change="onChange"
          @changing="onChanging"
        />
      </div>
      <div style="text-align: center">
        {{ value }}
      </div>
    </div>

    <div style="flex: 1 1 100px">
      <div style="height: 300px; text-align: center">
        <YuumiSlider v-model="value" vertical disabled @change="onChange" />
      </div>
      <div style="text-align: center">
        {{ value }}
      </div>
    </div>

    <div style="flex: 1 1 100px">
      <div style="height: 300px; text-align: center">
        <YuumiSlider v-model="value1" vertical range @change="onChange" />
      </div>
      <div style="text-align: center">
        {{ value1 }}
      </div>
    </div>

    <div style="flex: 1 1 100px">
      <div style="height: 300px; text-align: center">
        <YuumiSlider v-model="value2" vertical range :step="10" @change="onChange" />
      </div>
      <div style="text-align: center">
        {{ value2 }}
      </div>
    </div>

    <div style="flex: 1 1 100px">
      <div style="height: 300px; text-align: center">
        <YuumiSlider
          v-model="value2"
          vertical
          range
          :step="10"
          :show-stops="true"
          @change="onChange"
        />
      </div>
      <div style="text-align: center">
        {{ value2 }}
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
      value: 10,
      value1: [30, 70],
      value2: [40, 60]
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    },
    onChanging(value) {
      this.btnColor = value > 50 ? "red" : "yellow"
    }
  }
}
</script>
