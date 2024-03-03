<template>
  <div :class="[ns.n(), ns.m(align)]">
    <template v-for="item in buttons" :key="item.text">
      <YuumiButton
        v-if="item.type === 'btn'"
        size="sm"
        outline
        :theme="item.selected ? 'primary' : 'default'"
        :disabled="item.disabled"
        @click="clickHandler(item)"
      >
        {{ item.text }}
      </YuumiButton>
      <div v-else>
        {{ item.text }}
      </div>
    </template>

    <div v-if="totalVisible && Number(total) > 0" :class="ns.e('total')">
      共 <span>{{ total }}</span> 条
    </div>

    <YuumiInput v-model="skipValue" size="sm" :limit="skipValueLimit" />
    <YuumiButton size="sm" theme="primary" @click="skipHanlder"> 确认 </YuumiButton>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { createRange } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { paginationProps } from "./props"
import { paginationEmits } from "./emits"
import { YuumiButton } from "../../button"
import { YuumiInput } from "../../input"

interface BtnItem {
  type: "btn" | "text"
  text: string
  value?: number
  selected?: boolean
  disabled?: boolean
}

defineOptions({ name: "YuumiPagination" })
const ns = useNameSpace("pagination")
const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)
const page = computed(() => Number(props.page))
const pageTotal = computed(() => Number(props.pageTotal || props.page || 0))

const buttons = computed<BtnItem[]>(() => {
  const half = Math.floor(props.maxLength / 2)
  const left = Math.max(1, page.value - half)
  const right = Math.min(Math.max(page.value + half, props.maxLength), pageTotal.value)
  const btns = createRange<BtnItem>(left, right, item => ({
    type: "btn",
    text: String(item),
    value: item,
    selected: item === page.value
  }))

  if (left > 2) {
    btns.unshift({ type: "btn", text: "1", value: 1 }, { type: "text", text: "..." })
  }

  btns.unshift({
    type: "btn",
    text: props.prevBtnText,
    value: page.value - 1,
    disabled: page.value <= 1
  })

  if (right + 2 < pageTotal.value) {
    btns.push(
      { type: "text", text: "..." },
      { type: "btn", text: String(pageTotal.value), value: pageTotal.value }
    )
  }

  btns.push({
    type: "btn",
    text: props.nextBtnText,
    value: page.value + 1,
    disabled: page.value >= pageTotal.value
  })

  return btns
})

const skipValue = ref("")
function skipValueLimit(vlaue: number) {
  const _v = Number(vlaue)
  if (!_v || _v <= 0 || _v > pageTotal.value) return false
  return true
}

function skipPage(page: number) {
  page && emit("change", page)
}

function clickHandler(item: any) {
  skipPage(item.value)
}

function skipHanlder() {
  skipPage(Number(skipValue.value))
}
</script>
