import type { App } from "vue"
import Popper from "./src/index"

export default {
  install: (app: App): void => {
    app.component(Popper.name!, Popper)
  }
}

export const YuumiPopper = Popper
