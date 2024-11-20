<template>
  <div>
    <YuumiNumberInput v-model="value" :max="10" :min="-10" style="width: 400px;"/>
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
