<template>
  <YuumiDatePicker
    v-model="value1"
    type="range"
    disabled
    style="margin: 0 10px 10px 0"
    @change="log('change', $event)"
  />

  <YuumiDatePicker
    v-model="value2"
    type="rangetime"
    disabled
    style="margin: 0 10px 10px 0"
    @change="log('change', $event)"
  />
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
