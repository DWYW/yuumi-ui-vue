<template>
  <div v-for="size in ['xl', 'lg', 'md', 'sm', 'xm']" :key="size" style="margin-bottom: 10px">
    <YuumiNumberInput v-model="value" :size="size" />
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
