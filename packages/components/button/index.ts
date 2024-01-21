import type { App } from "vue"
import Button from "./src/Index.vue"

export default {
  install: (app: App) => {
    app.component(Button.name, Button)
  }
}

export const YuumiButton = Button
