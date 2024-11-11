import type { App } from "vue"
import Tooltip from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Tooltip.name!, Tooltip)
  }
}

export const YuumiTooltip = Tooltip
