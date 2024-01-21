<template>
  <YuumiTimePicker disabled style="margin: 0 10px 10px 0" />
  <YuumiTimePicker v-model="value" disabled style="margin: 0 10px 10px 0" />

  <YuumiTimePicker v-model="value1" :disabled-hours="disabledHours" style="margin: 0 10px 10px 0" />
  <YuumiTimePicker
    v-model="value2"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    style="margin: 0 10px 10px 0"
  />
  <YuumiTimePicker
    v-model="value3"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    :disabled-seconds="disabledSeconds"
    style="margin: 0 10px 10px 0"
  />

  <YuumiTimePicker
    v-model="value4"
    range
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    :disabled-seconds="disabledSeconds"
    style="margin: 0 10px 10px 0"
  />

  <div>value -> {{ value }}</div>
  <div>value1 -> {{ value1 }}</div>
  <div>value2 -> {{ value2 }}</div>
  <div>value3 -> {{ value3 }}</div>
  <div>value4 -> {{ value4 }}</div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      value1: null,
      value2: null,
      value3: "00:00:00",
      value4: ["00:00:00", "00:00:18"]
    }
  },
  methods: {
    disabledHours() {
      return [0, 1, 2, 3, 4, 5]
    },
    disabledMinutes(hour) {
      if (hour === 6) return [0, 1, 2, 3, 4, 5]
      return [58, 59]
    },
    disabledSeconds(_hour, minute) {
      if (minute === 6) return [0, 1, 2, 3, 4, 5]
      return [58, 59]
    }
  }
}
</script>
