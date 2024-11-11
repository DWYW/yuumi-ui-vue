import { App, VNode, computed, createApp, defineComponent, ref } from "vue"
import { YuumiDialog } from "../components/dialog"
import { YuumiButton } from "../components/button"
import { YuumiIcon } from "../components/icon"
import { YuumiWarning } from "../components/warning"

const __YUUMI_PLUGIN__ = {
  app: null as App | null,
  plugins: ref(new Map<VNode, { name: string; component: VNode }>())
}

const pluginApp = defineComponent({
  setup() {
    const nodes = computed(() => {
      const res = [] as VNode[]
      __YUUMI_PLUGIN__.plugins.value.forEach(item => {
        res.push(item.component)
      })
      return res
    })

    return { nodes }
  },
  render() {
    return this.nodes
  }
})

function createYuumiPluginApp() {
  const el = document.createElement("div")
  el.setAttribute("class", "yuumi-plugins")
  el.setAttribute("style", "position: absolute;bottom:0px;left:0px;width:0px;height:0px;")
  const app = createApp(pluginApp)
  app.mount(el)

  app.component(YuumiDialog.name!, YuumiDialog)
  app.component(YuumiButton.name!, YuumiButton)
  app.component(YuumiIcon.name!, YuumiIcon)
  app.component(YuumiWarning.name!, YuumiWarning)

  document.body.appendChild(el)
  __YUUMI_PLUGIN__.app = app
}

export function pluginMount(component: VNode, name: string) {
  if (!__YUUMI_PLUGIN__.app) {
    createYuumiPluginApp()
  }
  __YUUMI_PLUGIN__.plugins.value.set(component, { component, name })
}

export function pluginUnmount(node: VNode) {
  __YUUMI_PLUGIN__.plugins.value.delete(node)
}

export function getPlugins() {
  return __YUUMI_PLUGIN__.plugins.value
}
