import type { App } from "vue"
import Empty from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Empty.name, Empty)
  }
}

export const YuumiEmpty = Empty
