<template>
  <YuumiTimePicker v-model="value1" style="margin: 0 10px 10px 0" clearable />
  <YuumiTimePicker v-model="value2" style="margin: 0 10px 10px 0" clearable range />

  <div>value1 ==> {{ value1 }}</div>
  <div>value2 ==> {{ value2 }}</div>
</template>

<script>
export default {
  data() {
    return {
      value1: null,
      value2: null
    }
  }
}
</script>
