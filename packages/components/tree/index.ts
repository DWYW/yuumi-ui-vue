import type { App } from "vue"
import Tree from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Tree.name, Tree)
  }
}

export const YuumiTree = Tree
