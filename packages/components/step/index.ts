import type { App } from "vue"
import Step from "./src/Index.vue"
import StepItem from "./src/Item.vue"

export default {
  install: (app: App): void => {
    app.component(Step.name!, Step)
    app.component(StepItem.name!, StepItem)
  }
}

export const YuumiStep = Step
export const YuumiStepItem = StepItem
