<template>
  <div>
    <YuumiNumberInput
      v-model="value"
      :step="0.1"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  }
}
</script>