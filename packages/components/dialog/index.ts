import type { App } from "vue"
import Dialog from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Dialog.name, Dialog)
  }
}

export const YuumiDialog = Dialog
