<template>
  <div :class="[ns.e('cell'), ns.em('cell', align)]" :style="{ fontSize: type ? '0px' : '' }">
    <YuumiCheckbox
      v-if="type === 'selection'"
      v-model="checked"
      style="height: 1em"
      :unique="rowIndex"
      @change="selectionChanged"
    />

    <slot
      v-else
      :row="attrs.data"
      :row-index="rowIndex"
      :props="$props"
      :content="defaultContent"
    >
      {{ defaultContent }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, useAttrs, watch } from "vue"
import { equal, getValueByPath } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { tableColumnProps } from "./props"
import { selectionProvideKey } from "./provide"
import type { TableSelection } from "./useSelection"

defineOptions({ name: "YuumiTableColumn", inheritAttrs: false })
const props = defineProps(tableColumnProps)
const ns = useNameSpace("table")
const attrs = useAttrs()
const rowIndex = computed(() => attrs["row-index"] as string)

const defaultContent = computed(() => {
  if (!props.prop) return ""
  return getValueByPath<any>(attrs.data, props.prop, props.placeholder)
})

const { selections, selectionChanged } = inject<TableSelection>(selectionProvideKey)!
const isInSelections = computed(() => selections.value.some(item => equal(item, attrs.data)))
const checked = ref(isInSelections.value)
watch(
  () => selections.value.length,
  (value, oldValue) => {
    if (value === oldValue) return

    if (isInSelections.value !== checked.value) {
      checked.value = isInSelections.value
    }
  }
)
</script>
