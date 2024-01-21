<template>
  <section class="group-item">
    <p class="group-item__name">{{ group.label }}</p>

    <nav
      v-for="nav in group.children"
      :key="nav.label"
      @click="$router.push(nav.path)"
      :class="['nav-item', { 'is-actived': nav.path === $route.path }]"
    >
      <span class="nav-item__name">{{ nav.name }}</span>
      <span class="nav-item__label">{{ nav.label }}</span>
    </nav>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  group: Record<string, any>
}>()
</script>

<style lang="scss" scoped>
.group-item {
  &__name {
    color: var(--text-color-tertiary);
    font-size: var(--font-size-xm);
    box-sizing: border-box;
    padding: var(--space-vertical-md) var(--space-horizontal-md) var(--space-vertical-xm);
  }
}

.nav-item {
  box-sizing: border-box;
  padding: var(--space-vertical-sm) var(--space-horizontal-md);
  cursor: pointer;

  &__label {
    color: var(--text-color-tertiary);
    padding-left: var(--space-horizontal-xm);
    font-size: 0.9em;
  }

  &.is-actived > * {
    color: var(--color-primary);
  }
}
</style>
