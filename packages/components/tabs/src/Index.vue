<template>
  <div :class="[ns.n(), ns.m(type), ns.m(position)]">
    <div :ref="_refs.head" :class="ns.e('head')">
      <div v-if="hasScrollbar" :class="ns.em('btn', 'prev')" @click="updateNavsPosition(-1)">
        <YuumiIcon :icon="isVertical ? 'line-arrow-top' : 'line-arrow-left'" />
      </div>

      <div :class="ns.e('navs')">
        <div :ref="_refs.navsBody" :class="ns.eb('navs', 'body')" :style="navsStyle">
          <template v-for="(item, index) in tabs" :key="item.props.value">
            <div
              :class="[ns.eb('navs', 'item'), ns.is('_selected', activeIndex === index)]"
              @click="selectHandler(index)"
            >
              <template v-if="item.children && item.children.label">
                <component :is="() => item.children.label(item.props)" />
              </template>
              <template v-else>
                {{ item.props.label }}
              </template>
            </div>
          </template>
          <div v-if="type === 'line'" :class="ns.eb('navs', 'line')">
            <div :class="ns.eb('navs', 'rect')" :style="rectStyle" />
          </div>
        </div>
      </div>

      <div v-if="hasScrollbar" :class="ns.em('btn', 'next')" @click="updateNavsPosition(1)">
        <YuumiIcon :icon="isVertical ? 'line-arrow-bottom' : 'line-arrow-right'" />
      </div>
    </div>
    <div :class="ns.e('body')">
      <TransitionGroup :name="ns.n()">
        <template v-for="(item, index) in tabs" :key="item.props.value">
          <div v-if="activeIndex === index" :class="ns.e('content')">
            <component :is="item.children.default" />
          </div>
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, useSlots, ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue"
import { getValueByPath } from "../../../share/helper"
import { useChildrenVNode, useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { TabsProps, tabsProps } from "./props"
import { tabEmits } from "./emits"
import { propsProvideKey } from "./provide"
import { useStyle } from "./useStyle"
import { YuumiTabItem } from ".."
import { YuumiIcon } from "../../icon"

defineOptions({ name: "YuumiTabs" })
onMounted(() => {
  nextTick(resizeHandler)
  window.addEventListener("resize", resizeHandler, false)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler, false)
})

const ns = useNameSpace("tabs")
const props = defineProps(tabsProps)
const emit = defineEmits(tabEmits)
const _refs = {
  head: ref(),
  navsBody: ref()
}
const _props = computed<TabsProps>(() => getComponentProps(props))
provide(propsProvideKey, _props)
const {
  isVertical,
  rectStyle,
  updateRectPosition,
  hasScrollbar,
  updateScollbarState,
  navsStyle,
  updateNavsPosition
} = useStyle(_props, _refs)

const slots = useSlots()
const tabs = computed<any[]>(() => {
  return useChildrenVNode(slots.default ? slots.default() : [], YuumiTabItem.name)
})

const activeIndex = computed({
  get() {
    return tabs.value.findIndex(item => item.props.value === props.modelValue)
  },
  set(index: number) {
    const value = getValueByPath(tabs.value[index], "props.value", "")
    if (value !== props.modelValue) {
      emit("update:modelValue", value)
      emit("change", value)
    }
  }
})

watch(
  () => activeIndex.value,
  () => {
    nextTick(() => {
      props.type === "line" && updateRectPosition()
      updateNavsPosition(0)
    })
  }
)

function selectHandler(index: number) {
  activeIndex.value = index
}

function resizeHandler() {
  props.type === "line" && updateRectPosition()
  updateScollbarState(),
    // 防止由于scrollbar state 变化引起的获取尺寸不准确的问题
    nextTick(() => {
      updateNavsPosition(0)
    })
}
</script>
