<template>
  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker v-model="value1" style="margin-right: 10px" @change="log('change', $event)" />

    <YuumiDatePicker v-model="value1" @change="log('change', $event)" />

    <div>{{ value1 }}</div>
  </div>

  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value2"
      type="datetime"
      style="margin-right: 10px"
      @change="log('change', $event)"
    />

    <YuumiDatePicker v-model="value2" type="datetime" @change="log('change', $event)" />

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
