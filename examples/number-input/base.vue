<template>
  <div style="margin-bottom: 16px">
    <YuumiNumberInput
      v-model="value"
      @change="onChange"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      style="width: 400px;"
    />
  </div>
  <div>
    <YuumiNumberInput v-model="value" disabled style="width: 400px;"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  methods: {
    onChange(value) {
      console.log("`change` event: ", value)
    },
    onInput(value) {
      console.log("`input` event: ", value)
    },
    onFocus(e) {
      console.log("`focus` event: ", e)
    },
    onBlur(e) {
      console.log("`blur` event: ", e)
    }
  }
}
</script>
