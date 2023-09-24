<template>
  <YuumiTimePicker
    v-for="size in ['xl', 'lg', 'md', 'sm', 'xm']"
    :key="size"
    v-model="value"
    style="margin: 0 10px 10px 0;"
    :size="size"
    @change="onChange"
  />
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    onChange (detail) {
      console.log("onChange", detail)
    }
  }
}
</script>
