import type { App } from "vue"
import Slider from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Slider.name!, Slider)
  }
}

export const YuumiSlider = Slider
