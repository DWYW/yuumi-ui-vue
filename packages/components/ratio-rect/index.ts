import type { App } from "vue"
import RatioRect from "./src/index.vue"

export default {
  install: (app: App): void => {
    app.component(RatioRect.name, RatioRect)
  }
}

export const YuumiRatioRect = RatioRect
