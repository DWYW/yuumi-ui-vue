<template>
  <YuumiDialog v-model="isShow" :class="ns.n()" v-bind="attrs">
    <template #title>
      <template v-if="typeof title === 'string'">
        {{ title }}
      </template>
      <component :is="title" v-else />
    </template>

    <template #default>
      <template v-if="typeof content === 'string'">
        {{ content }}
      </template>
      <component :is="content" v-else />
    </template>
  </YuumiDialog>
</template>

<script lang="ts" setup>
import { ref, useAttrs } from "vue"
import { useNameSpace } from "../../share/useApi"

defineOptions({ name: "YuumiAlert", inheritAttrs: false })
const ns = useNameSpace("alert")
const { title, content, ...attrs } = useAttrs()

const isShow = ref(true)
defineExpose({ hide: () => (isShow.value = false) })
</script>
