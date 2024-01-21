<template>
  <div>
    <YuumiSwitch style="margin: 0 10px 10px 0" readonly />
    <YuumiSwitch style="margin: 0 10px 10px 0" open-color="green" close-color="red" readonly>
      <template #open> 开 </template>
      <template #close> 关 </template>
    </YuumiSwitch>
  </div>
</template>
