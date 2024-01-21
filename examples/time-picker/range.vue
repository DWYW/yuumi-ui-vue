<template>
  <YuumiTimePicker v-model="value" range style="margin: 0 10px 10px 0" @change="onChange" />
  <YuumiTimePicker v-model="value1" range style="margin: 0 10px 10px 0" @change="onChange" />
</template>

<script>
export default {
  data() {
    return {
      value: ["17:05:04", "18:05:04"],
      value1: []
    }
  },
  methods: {
    onChange(detail) {
      console.log("onChange", detail)
    }
  }
}
</script>
