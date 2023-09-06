<template>
  <div
    class="yuumi-empty"
    v-bind="$attrs"
  >
    <div class="empty__image">
      <img
        v-if="image"
        :src="image"
        :style="{ width: imageSize + 'px' }"
        alt="empty"
      >
      <YuumiIcon
        v-else
        icon="line-empty"
        :style="{ fontSize: imageSize + 'px' }"
      />
    </div>

    <div
      v-if="description"
      class="empty__description"
    >
      {{ description }}
    </div>

    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: 'YuumiEmpty',
  props: {
    image: { type: String },
    imageSize: { type: Number, default: 64 },
    description: { type: String }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.yuumi-empty {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .empty__image {
    color: map-get($--color, "placeholder");
  }

  .empty__description {
    color: map-get($--text-color, "tertiary");
    padding: map-get($--space, "xm") 0 map-get($--space, "sm");
  }
}
</style>