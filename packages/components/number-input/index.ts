import type { App } from "vue"
import NumberInput from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(NumberInput.name!, NumberInput)
  }
}

export const YuumiNumberInput = NumberInput
