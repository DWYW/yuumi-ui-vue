import type { App } from 'vue'
import RatioImage from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(RatioImage.name, RatioImage)
  }
}

export const YuumiRatioImage = RatioImage
