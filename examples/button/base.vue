<template>
  <div>
    <YuumiButton style="margin: 0 10px 10px 0"> 默认按钮 </YuumiButton>
  </div>
  <div>
    <YuumiButton
      v-for="theme in ['primary', 'success', 'danger', 'warn']"
      :key="theme"
      :theme="theme"
      style="margin: 0 10px 10px 0"
    >
      {{ theme }} button
    </YuumiButton>
  </div>
  <div>
    <YuumiButton
      v-for="theme in ['primary', 'success', 'danger', 'warn']"
      :key="theme"
      :type="theme"
      plain
      style="margin: 0 10px 10px 0"
    >
      {{ theme }} plain
    </YuumiButton>
  </div>
</template>
