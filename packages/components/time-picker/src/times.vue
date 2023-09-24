<template>
  <div class="picker-times">
    <picker-time-item
      v-if="hourEnabled"
      v-model="hoursValue"
      type="hours"
      :disabled="disabledHours && disabledHours()"
    />
    <picker-time-item
      v-if="minuteEnabled"
      v-model="minutesValue"
      type="minutes"
      :disabled="disabledMinutes && disabledMinutes({hours})"
    />
    <picker-time-item
      v-if="secondEnabled"
      v-model="secondsValue"
      type="seconds"
      :disabled="disabledSeconds && disabledSeconds({hours, minutes})"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import TimeItem from './time-item.vue'

export default defineComponent({
  name: 'PickerTimes',
  components: {
    [TimeItem.name]: TimeItem
  },
  props: {
    format: {
      type: String,
      required: true
    },
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    hours: Number,
    minutes: Number,
    seconds: Number
  },
  emits: ['change'],
  setup (props, { emit }) {
    const hoursValue = computed({
      get: () => props.hours,
      set: value => {
        if (value !== props.hours) {
          emit('change', { value, method: 'setHours' })
        }
      }
    })

    const minutesValue = computed({
      get: () => props.minutes,
      set: value => {
        if (value !== props.minutes) {
          emit('change', { value, method: 'setMinutes' })
        }
      }
    })

    const secondsValue = computed({
      get: () => props.seconds,
      set: value => {
        if (value !== props.seconds) {
          emit('change', { value, method: 'setSeconds' })
        }
      }
    })

    return {
      hoursValue,
      minutesValue,
      secondsValue
    }
  },
  computed: {
    hourEnabled (): boolean {
      return /h/.test(this.format)
    },
    minuteEnabled (): boolean {
      return /m/.test(this.format)
    },
    secondEnabled (): boolean {
      return /s/.test(this.format)
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";

.picker-times {
  width: 160px;
  display: inline-table;

  &:not(:first-child) {
    @include Border($attr: "border-left");
  }
}
</style>