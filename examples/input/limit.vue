<template>
  <YuumiInput
    v-model="value1"
    placeholder="只能输入数字"
    :limit="onlyNumber"
    style="margin: 0 10px 10px 0;"
  />
  <span>{{ value1 }}</span> <br>

  <YuumiInput
    v-model="value2"
    placeholder="不能输入数字"
    :limit="excludeNumber"
    style="margin: 0 10px 10px 0;"
  />
  <span>{{ value2 }}</span> <br>

  <YuumiInput
    v-model="value3"
    placeholder="不能输入空白字符"
    :limit="notBlank"
    style="margin: 0 10px 10px 0;"
  />
  <span>{{ value3 }}</span> <br>

  <YuumiInput
    v-model="value4"
    placeholder="不能输入空白字符"
    trim
    style="margin: 0 10px 10px 0;"
  />
  <span>{{ value4 }}</span> <br>
</template>

<script>
export default {
  data () {
    return {
      value1: '只能输入数字',
      value2: '2222',
      value3: '',
      value4: ''
    }
  },
  computed: {
    onlyNumber () {
      return /^\d+$/
    },
    excludeNumber () {
      return (value) => /^[^\d]+$/.test(value)
    },
    notBlank () {
      return /^\S*$/
    }
  }
}
</script>