<template>
  <div style="display: flex; align-items: center">
    <div style="flex: 1 1 auto">
      <YuumiSlider v-model="value" reverse @change="onChange" />
    </div>
    <div style="flex: 0 0 60px">
      {{ value }}
    </div>
  </div>

  <div style="display: flex; align-items: center">
    <div style="flex: 1 1 auto">
      <YuumiSlider v-model="value1" placement="bottom" range @change="onChange" />
    </div>
    <div style="flex: 0 0 60px">
      {{ value1 }}
    </div>
  </div>

  <div style="display: flex; justify-content: space-around">
    <div style="flex: 1 1 100px">
      <div style="height: 300px; text-align: center">
        <YuumiSlider v-model="value" vertical reverse placement="left" @change="onChange" />
      </div>
      <div style="text-align: center">
        {{ value }}
      </div>
    </div>

    <div style="flex: 1 1 100px">
      <div style="height: 300px; text-align: center">
        <YuumiSlider v-model="value1" range vertical @change="onChange" />
      </div>
      <div style="text-align: center">
        {{ value1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
      value1: [20, 50]
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
    }
  }
}
</script>
