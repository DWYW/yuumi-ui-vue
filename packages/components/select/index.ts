import type { App } from "vue"
import Select from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Select.name!, Select)
  }
}

export const YuumiSelect = Select
