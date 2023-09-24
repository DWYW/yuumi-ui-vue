<template>
  <YuumiDatePicker
    v-model="value1"
    :disabled-dates="disabledBeforeDates"
    style="margin: 0 10px 10px 0;"
    @change="log('change', $event)"
  />

  <YuumiDatePicker
    v-model="value2"
    type="range"
    :disabled-dates="disabledAfterDates"
    style="margin: 0 10px 10px 0;"
    @change="log('change', $event)"
  />
</template>

<script>
  export default {
    data () {
      return {
        value1: null,
        value2: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      },
      disabledBeforeDates (value) {
        return value.getTime() < Date.now()
      },
      disabledAfterDates (value) {
        return value.getTime() > Date.now()
      }
    }
  }
</script>