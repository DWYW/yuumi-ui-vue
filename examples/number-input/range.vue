<template>
  <div>
    <YuumiNumberInput v-model="value" :max="10" :min="-10" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 10
    }
  }
}
</script>
