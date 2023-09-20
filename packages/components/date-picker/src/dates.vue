<template>
  <div class="date-panel">
    <slot />
    <div class="panel__header">
      <div
        v-for="item in weeks"
        :key="item"
        class="week-item"
      >
        <div class="item-content">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="panel__body">
      <template
        v-for="item in dates"
        :key="item.value.toString()"
      >
        <div
          :class="['date-item', item.className, {
            '_selected': item.isSelected,
            'in-range': item.inRange,
            'range_start': item.isRangeStart,
            'range_end': item.isRangeEnd,
            '_disabled': item.disabled
          }]"
          @click="onSelect(item)"
          @mouseenter="onMouseenter(item)"
        >
          <div class="item-content">
            {{ item.value.getDate() }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dates: Array as any
  },
  emits: ['select', 'itemEnter'],
  setup () {
    const weeks = ['日', '一', '二', '三', '四', '五', '六']

    return {
      weeks
    }
  },
  methods: {
    onSelect (item: any) {
      if (item.disabled) return
      this.$emit('select', item.value)
    },

    onMouseenter (item: any) {
      if (item.disabled) return
      this.$emit('itemEnter', item.value)
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";
$item-size: 24px;
$item-space: 5px;

.date-panel {
  display: inline-block;
  @include Space("padding", "sm");

  &:not(:last-child) {
    @include Border($attr: "border-right");
  }

  .panel__header, .panel__body {
    overflow: hidden;
    width: ($item-size + $item-space*2)*7;
    margin: 0 auto;
  }

  .panel__header {
    @include Border($attr: "border-bottom");
  }

  .week-item, .date-item {
    display: block;
    float: left;
    text-align: center;
    padding: $item-space;
    margin: $item-space*0.5 0;

    .item-content {
      width: $item-size;
      line-height: $item-size;
    }
  }

  .date-item {
    cursor: pointer;
    font-size: 12px;

    &._prev-month, &._next-month {
      @include ColorWithKey("placeholder");
    }

    &._current-month {
      &.in-range {
        @include AlphaBackgroundColorWithKey("primary", 0.1);
      }

      &._selected, &.range_start, &.range_end {
        .item-content {
          @include ColorWithKey("white");
          @include BackgroundColorWithKey("primary");
          @include BorderRadius("circle");
        }
      }

      &.range_start {
        @include BorderRadiusPartail("top-left", "round");
        @include BorderRadiusPartail("bottom-left", "round");
      }

      &.range_end {
        @include BorderRadiusPartail("top-right", "round");
        @include BorderRadiusPartail("bottom-right", "round");
      }

      &._disabled {
        @include ColorWithKey("placeholder");
      }
    }
  }
}
</style>