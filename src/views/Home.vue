<template>
  <div class="home-view">
    <Rocket class="rocket" />

    <div class="main">
      <div class="name">Yuumi UI</div>
      <div class="desc">Based on Vue 3.0</div>

      <div class="btns">
        <a href="#/doc">
          <YuumiButton theme="primary" round>Quick Start</YuumiButton>
        </a>

        <a target="_blank" href="https://github.com/DWYW/yuumi-ui-vue">
          <YuumiButton round>Github</YuumiButton>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Rocket from "@/components/Rocket.vue"
</script>

<style lang="scss" scoped>
.home-view {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    display: block;
    content: " ";
    width: 150vw;
    height: 150vw;
    border-radius: 50%;
    background-color: var(--color-primary);

    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate3d(-62.25%, 12.25%, 0);
  }
}

.rocket {
  position: fixed;
  bottom: 60%;
  left: 25%;
  transform: rotate(20deg) translate3d(-50%, 100%, 0);
}

.main {
  width: 50vw;
  text-align: center;

  position: absolute;
  top: 50%;
  right: 0;
  transform: translate3d(0, -50%, 0);
  line-height: 2;

  .name {
    font-size: calc(var(--font-size-md) * 2);
    font-weight: bold;
  }

  .btns {
    margin-top: var(--space-vertical-lg);

    :not(:first-child) {
      margin-left: var(--space-horizontal-sm);
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }
}
</style>
