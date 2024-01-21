import type { App } from "vue"
import TimePicker from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(TimePicker.name, TimePicker)
  }
}

export const YuumiTimePicker = TimePicker
