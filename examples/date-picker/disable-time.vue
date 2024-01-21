<template>
  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value1"
      type="datetime"
      :disabled-hours="disabledHours"
      @change="log('change', $event)"
    />
  </div>

  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value2"
      type="rangetime"
      :disabled-hours="disabledHours"
      @change="log('change', $event)"
    />
  </div>

  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value3"
      type="datetime"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      @change="log('change', $event)"
    />
  </div>

  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value4"
      type="rangetime"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      @change="log('change', $event)"
    />
  </div>

  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value5"
      type="datetime"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      @change="log('change', $event)"
    />
  </div>

  <div style="margin: 0 10px 10px 0">
    <YuumiDatePicker
      v-model="value6"
      type="rangetime"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      @change="log('change', $event)"
    />
  </div>
</template>

<script>
export default {
  data() {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return {
      value1: new Date(now.toString()),
      value2: [new Date(now.toString()), new Date(now.toString())],
      value3: new Date(now.toString()),
      value4: [new Date(now.toString()), new Date(now.toString())],
      value5: new Date(now.toString()),
      value6: [new Date(now.toString()), new Date(now.toString())]
    }
  },
  methods: {
    log(type, value) {
      console.log(type, value)
    },
    disabledHours({ year, month, date }) {
      const now = new Date()
      if (now.getFullYear() === year && now.getMonth() === month && now.getDate() === date) {
        return [0, 1, 2, 3, 4, 5, 6]
      } else {
        return []
      }
    },
    disabledMinutes({ year, month, date, hours }) {
      const now = new Date()
      if (
        now.getFullYear() === year &&
        now.getMonth() === month &&
        now.getDate() === date &&
        hours === 7
      ) {
        return [0, 1, 2, 3, 4, 5, 6]
      } else {
        return []
      }
    },

    disabledSeconds({ year, month, date, hours, minutes }) {
      const now = new Date()
      if (
        now.getFullYear() === year &&
        now.getMonth() === month &&
        now.getDate() === date &&
        hours === 7 &&
        minutes === 7
      ) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8]
      } else {
        return []
      }
    }
  }
}
</script>
