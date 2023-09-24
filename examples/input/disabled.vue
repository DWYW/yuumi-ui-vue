<template>
  <div>
    <YuumiInput
      placeholder="disabled"
      style="margin: 0 10px 10px 0;"
      disabled
    />

    <YuumiInput
      v-for="(item, index) in ['primary', 'success', 'warn', 'danger']"
      :key="index"
      placeholder="disabled"
      style="margin: 0 10px 10px 0;"
      :theme="item"
      disabled
    />
  </div>
</template>