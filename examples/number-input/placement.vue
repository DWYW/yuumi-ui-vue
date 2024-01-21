<template>
  <div style="margin-bottom: 10px">
    <YuumiNumberInput v-model="value" hide-btn btn-placement="default" />
  </div>

  <div style="margin-bottom: 10px">
    <YuumiNumberInput v-model="value" btn-placement="left" />
  </div>

  <div style="margin-bottom: 10px">
    <YuumiNumberInput v-model="value" btn-placement="right" />
  </div>

  <div style="margin-bottom: 10px">
    <YuumiNumberInput v-model="value" size="xm" btn-placement="right" />
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
