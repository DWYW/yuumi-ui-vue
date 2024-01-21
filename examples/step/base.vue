<template>
  <YuumiStep :active="step">
    <YuumiStepItem title="step 1"> 这里描述信息 </YuumiStepItem>
    <YuumiStepItem title="step 2"> 这里描述信息 </YuumiStepItem>

    <YuumiStepItem title="step 3"> 这里描述信息 </YuumiStepItem>
  </YuumiStep>

  <YuumiButton style="margin: 10px" @click="setStep(-1)"> prev step </YuumiButton>
  <YuumiButton @click="setStep(1)"> next step </YuumiButton>
</template>

<script>
export default {
  data() {
    return {
      step: 0
    }
  },
  methods: {
    setStep(step) {
      this.step = Math.min(Math.max(0, this.step + step), 3)
    }
  }
}
</script>
