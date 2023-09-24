<template>
  <div class="page">
    <header class="header">
      <div class="header-main">
        <div class="logo">
          <a href="#/">
            <img
              class="img"
              src="../assets/images/logo.png"
              alt=""
            >
            <div class="name">YUUMI</div>
          </a>
        </div>

        <div class="_expand" />

        <div class="_active">
          组件
        </div>
        <div class="version">
          {{ appVersion }}
        </div>
      </div>
    </header>

    <aside
      ref="asideEl"
      class="aside"
    >
      <YuumiScrollbar>
        <section
          v-for="group in navs"
          :key="group.label"
          class="group"
        >
          <div class="group-name">
            {{ group.label }}
          </div>

          <nav
            v-for="nav in group.children"
            :key="nav.label"
            :class="{ active: nav.path === $route.path}"
            @click="toNavDetail(nav)"
          >
            <span class="nav-name">{{ nav.name }}</span>
            <span class="nav-label">{{ nav.label }}</span>
          </nav>
        </section>
      </YuumiScrollbar>
    </aside>

    <div class="component">
      <YuumiScrollbar
        ref="mainScrollbar"
        dynamic
      >
        <div
          ref="mainEl"
          class="main"
        >
          <router-view class="component-view" />
        </div>
      </YuumiScrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, Ref, ref, watch } from "vue"
import { useRouter } from "vue-router"
import NAVS from '../common/navs'

export default defineComponent({
  setup() {
    const router = useRouter()
    const appVersion = computed(() => `v${__APP_VERSION__}`)
    const navs = computed(() => NAVS)

    function toNavDetail (nav: any) {
      if (!nav.path) return
      router.push(nav.path)
    }

    const asideEl: Ref<any> = ref()
    const mainEl: Ref<any> = ref()
    function onResize () {
      const mainRect = mainEl.value.getBoundingClientRect()
      const navsRect = asideEl.value.getBoundingClientRect()

      mainEl.value.setAttribute('style', `padding-left: ${navsRect.width + 20}px;`)
      asideEl.value.setAttribute('style', `left: ${mainRect.left}px;`)
    }

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize, false)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize, false)
    })

    const mainScrollbar: Ref<any> = ref()
    watch(() => router.currentRoute.value, (value, oldValue) => {
      if (value.fullPath !== oldValue.fullPath) {
        mainScrollbar.value.$refs.body.scrollTop = 0
      }
    })

    return {
      appVersion,
      navs,
      toNavDetail,
      asideEl,
      mainEl,
      mainScrollbar
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../packages/styles/mixin.scss";

$header-height: 60px;

.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.header {
  width: 100%;
  height: $header-height;
  background-color: #ffffff;
  z-index: 9;
  @include Shadow($blur: 4px, $key: "primary");

  position: sticky;
  top: 0;
  left: 0;

  .header-main {
    max-width: 1000px;
    margin: 0 auto;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    >* {
      flex: 0 0 1px;
      white-space: nowrap;
      @include Space("padding", "xm");
      @include FontSize("md");
    }

    ._active {
      @include ColorWithKey("primary");
    }

    >._expand {
      flex-grow: 1;
    }

    .logo {
      height: 61.8%;

      a {
        height: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
      }

      .name {
        @include Space("padding", "xm");
        @include FontSize("lg");
        @include ColorWithKey("primary");
        font-weight: bold;
      }

      .img {
        height: 100%;
      }
    }

    .version {
      @include FontSize("sm");
      @include Space("padding-left", "xl");
    }
  }
}
.aside {
  position: fixed;
  z-index: 8;
  top: $header-height;
  @include FontSize("sm");

  height: calc(100vh - #{$header-height});
  cursor: pointer;

  .group {
    &:first-child {
      @include Space("padding-top", "sm");
    }
    &:last-child {
      @include Space("padding-bottom", "sm");
    }
  }
  .group-name {
    @include TextColor("tertiary");
    @include FontSize("xm");
    box-sizing: border-box;
    @include Space("padding", "md");
    @include Space("padding-bottom", "xm");
  }

  nav {
    box-sizing: border-box;
    @include Space("padding-top", "xm");
    @include Space("padding-right", "md");
    @include Space("padding-bottom", "xm");
    @include Space("padding-left", "md");

    .nav-label {
      @include TextColor("tertiary");
      @include Space("padding-left", "xm");
      font-size: 0.9em;
    }

    &.active, &.active .nav-label {
      @include ColorWithKey("primary");
    }
  }
}

.component {
  height: calc(100vh - #{$header-height});
  .main {
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .component-view {
    padding-bottom: 100px;
    @include Space("padding-right", "sm");
  }
}

:deep(.vuedoc) {
  h1, h2, h3, h4, h5, h6 {
    > a {
      display: none;
    }
  }

  .vuedoc-demo__preview {
    color: #333333;
  }

  >.vuedoc__hljs {
    background-color: #fafafa;
    border: 1px solid #eaeefb;
  }
}

:deep(.vuedoc-demo__footer:hover) {
  color: #0d6efd;
}
</style>