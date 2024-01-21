<template>
  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value1"
      type="range"
      style="margin: 0 10px 10px 0"
      @change="log('change', $event)"
    />
    <YuumiDatePicker v-model="value1" type="range" @change="log('change', $event)" />

    <div>{{ value1 }}</div>
  </div>

  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value2"
      type="rangetime"
      style="margin: 0 10px 10px 0"
      @change="log('change', $event)"
    />
    <YuumiDatePicker v-model="value2" type="rangetime" @change="log('change', $event)" />

    <div>{{ value2 }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: null,
      value2: null
    }
  },
  methods: {
    log(type, value) {
      console.log(type, value)
    }
  }
}
</script>
