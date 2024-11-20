<template>
  <div>
    <YuumiNumberInput v-model="value" :step="0.1"  style="width: 400px;"/>
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
