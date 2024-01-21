<template>
  <div :class="ns.n()" :style="{ paddingTop: paddingTop }">
    <!-- 防止自定义样式污染布局 -->
    <div :class="ns.e('image')" v-bind="$attrs">
      <div
        v-if="isShowPlaceholder"
        :class="ns.em('image', 'placeholder')"
        :style="placeholderStyle"
      />

      <div v-else :class="ns.em('image', 'expectant')" :style="imageStyle">
        <img
          :src="image"
          style="width: 0; height: 0; opacity: 0"
          @load="loadHandler"
          @error="errorHandler"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { RatioImageProps, ratioImageProps } from "./props"
import { ratioImageEmits } from "./emits"
import { useStyle } from "./useStyle"

defineOptions({ name: "YuumiRatioImage", inheritAttrs: false })
const ns = useNameSpace("ratio-image")
const props = defineProps(ratioImageProps)
const emit = defineEmits(ratioImageEmits)
const _props = computed<RatioImageProps>(() => getComponentProps(props))

const paddingTop = computed(() => `${100 / props.ratio}%`)
const { imageStyle, placeholderStyle } = useStyle(_props)

const isLoadErr = ref(false)
// image改变后重置error状态，防止error之后一直显示placeholder image
watch(
  () => props.image,
  (value, oldValue) => {
    if (value !== oldValue) {
      isLoadErr.value = false
    }
  }
)

const isShowPlaceholder = computed(() => {
  return !props.image || isLoadErr.value
})

function errorHandler(e: Event) {
  isLoadErr.value = true
  emit("error", e)
}

function loadHandler(e: Event) {
  isLoadErr.value = false
  emit("load", e)
}
</script>
