import type { App } from "vue"
import Cascader from "./src/Index.vue"

export default {
  install: (app: App) => {
    app.component(Cascader.name, Cascader)
  }
}

export const YuumiCascader = Cascader
