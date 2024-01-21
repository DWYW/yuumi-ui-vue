<template>
  <YuumiInput
    v-model="mobile"
    style="margin: 0 10px 10px 0"
    placeholder="keyword"
    prefix-icon="line-mobile"
    @change="onChange"
  />

  <YuumiInput
    v-model="keyword"
    style="margin: 0 10px 10px 0"
    placeholder="keyword"
    suffix-icon="line-search"
    @change="onChange"
  />

  <YuumiInput
    v-model="keyword"
    style="margin: 0 10px 10px 0; width: 100%"
    placeholder="keyword"
    @change="onChange"
  >
    <template #suffix>
      <YuumiButton style="line-height: 0; border: none; border-radius: 0px" type="primary">
        <YuumiIcon icon="line-search" style="font-size: 16px" />
      </YuumiButton>
    </template>
  </YuumiInput>

  <YuumiInput
    v-model="keyword"
    style="margin: 0 10px 10px 0; width: 100%"
    placeholder="keyword"
    @change="onChange"
  >
    <template #prefix>
      <YuumiSelect
        v-model="type"
        style="
          border-right: none;
          border-color: var(--color-border);
          background: #f5f5f5;
          display: table;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        "
        :options="[
          { label: '百度', value: '百度' },
          { label: 'Google', value: 'Google' }
        ]"
      />
    </template>

    <template #suffix>
      <YuumiButton style="border-radius: 0px" type="primary">
        <YuumiIcon icon="line-search" style="font-size: 16px" />
      </YuumiButton>
    </template>
  </YuumiInput>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      keyword: "",
      type: "Google"
    }
  },
  methods: {
    onChange(e) {
      console.log("onchange", e)
    }
  }
}
</script>
