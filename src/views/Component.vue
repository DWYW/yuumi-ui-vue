<template>
  <div class="component-view">
    <header class="header">
      <div class="header__content row">
        <div class="row__prefix">
          <a class="header__logo" href="#/">
            <img class="img" src="../assets/images/logo.png" alt="" />
            <div class="name">YUUMI</div>
          </a>
        </div>

        <div class="row__content"></div>

        <div class="row__suffix">
          <span class="header__menu-item is-actived">组件</span>
          <span class="header__menu-item">{{ appVersion }}</span>
        </div>
      </div>
    </header>

    <div class="view__body">
      <YuumiScrollbar dynamic :ref="_refs.mainEl">
        <div class="view__body-content">
          <main>
            <router-view class="component-body" />
          </main>
        </div>
      </YuumiScrollbar>
    </div>
    <div class="view__aside">
      <div class="view__aside-body">
        <aside>
          <YuumiScrollbar>
            <AsideGroup
              v-for="group in navs"
              class="group"
              :key="group.label"
              :group="group"
            ></AsideGroup>
          </YuumiScrollbar>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"
import AsideGroup from "@/components/AsideGroup.vue"
import NAVS from "@/constants/nav"

const route = useRoute()
const appVersion = computed(() => `v${__APP_VERSION__}`)
const navs = computed(() => NAVS)

const _refs = {
  mainEl: ref()
}

watch(
  () => route.path,
  (value, oldValue) => {
    if (value !== oldValue) {
      _refs.mainEl.value.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
)
</script>

<style lang="scss" scoped>
$header-height: 60px;

.component-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.header {
  width: 100%;
  height: $header-height;
  background-color: #ffffff;
  z-index: 9;
  box-shadow: 0 0 4px var(--shadow-color-primary);

  &__content {
    max-width: 1000px;
    margin: 0 auto;
    height: 100%;
  }

  &__logo {
    height: $header-height * 0.618;
    display: flex;
    display: flex;
    align-items: center;
    text-decoration: none;

    .name {
      padding: var(--space-vertical-xm) var(--space-horizontal-xm);
      font-size: var(--font-size-lg);
      color: var(--color-primary);
      font-weight: bold;
    }

    .img {
      height: 100%;
    }
  }

  &__menu-item {
    font-size: var(--font-size-md);
    display: inline-block;
    margin-left: var(--space-horizontal-md);

    &.is-actived {
      color: var(--color-primary);
    }
  }
}

$alide-width: 232px;
.view__body {
  width: 100%;
  height: calc(100vh - $header-height);
  position: relative;

  .view__body-content {
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;

    > main {
      padding-left: $alide-width;
      padding-bottom: 80px;
    }
  }
}

.view__aside {
  width: 100%;
  position: absolute;
  top: $header-height;
  left: 0;

  .view__aside-body {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  aside {
    width: $alide-width - 16px;
    height: calc(100vh - $header-height);
    position: absolute;
    top: 0;
    left: 0;

    .group {
      &:first-child {
        padding-top: var(--space-vertical-md);
      }
      &:last-child {
        padding-bottom: var(--space-vertical-md);
      }
    }
  }
}

:deep(.component-body) {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    > a {
      display: none;
    }
  }

  > table {
    width: 100%;
    border-spacing: 0;
    line-height: 24px;

    th {
      padding: 8px 16px;
      word-break: keep-all;
      text-align: left;
      background-color: #f5f5f5;
    }

    td {
      padding: 8px 16px;
      border-bottom: 1px solid #ebedf0;

      > span.delete {
        text-decoration: line-through;
        color: rgb(204, 204, 204);
      }
    }

    tbody tr:nth-child(even) {
      background-color: #fafafa;
    }
  }

  blockquote {
    margin: 0;
    padding: var(--space-vertical-sm) var(--space-horizontal-md);
    border-left: 6px solid var(--color-border);
    background-color: rgb(217, 217, 217, 0.2);
  }

  pre {
    white-space: normal;
  }
}
</style>
