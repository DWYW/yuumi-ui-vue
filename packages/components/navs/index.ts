import type { App } from "vue"
import Menu from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Menu.name!, Menu)
  }
}

export const YuumiNavs = Menu
