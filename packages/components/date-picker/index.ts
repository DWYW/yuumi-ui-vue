import type { App } from "vue"
import DatePicker from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(DatePicker.name!, DatePicker)
  }
}

export const YuumiDatePicker = DatePicker
