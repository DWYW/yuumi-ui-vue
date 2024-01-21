<template>
  <YuumiButton disabled style="margin: 0 10px 10px 0"> 默认按钮 </YuumiButton>
  <div>
    <YuumiButton
      v-for="theme in ['primary', 'success', 'danger', 'warn']"
      :key="theme"
      :theme="theme"
      disabled
      style="margin: 0 10px 10px 0"
    >
      {{ theme }} button
    </YuumiButton>
  </div>
  <div>
    <YuumiButton
      v-for="theme in ['primary', 'success', 'danger', 'warn']"
      :key="theme"
      :theme="theme"
      plain
      disabled
      style="margin: 0 10px 10px 0"
    >
      {{ theme }} plain
    </YuumiButton>
  </div>
</template>
