import type { App } from "vue"
import Icon from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Icon.name!, Icon)
  }
}

export const YuumiIcon = Icon
