import type { App } from "vue"
import Divider from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Divider.name, Divider)
  }
}

export const YuumiDivider = Divider
