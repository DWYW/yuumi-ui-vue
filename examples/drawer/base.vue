<template>
  <template v-for="item in ['right', 'left', 'top', 'bottom']" :key="item">
    <YuumiButton style="margin: 0 10px 10px 0" @click="showDrawer(item)">
      {{ item }}
    </YuumiButton>
  </template>

  <YuumiDrawer v-model="show" :position="position">
    {{ position }}
  </YuumiDrawer>
</template>

<script>
export default {
  data() {
    return {
      position: "right",
      show: false
    }
  },
  methods: {
    showDrawer(position) {
      this.position = position
      this.show = true
    }
  }
}
</script>
