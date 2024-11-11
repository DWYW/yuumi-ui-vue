import type { App } from "vue"
import Tabs from "./src/Index.vue"
import TabItem from "./src/Item.vue"

export default {
  install: (app: App): void => {
    app.component(Tabs.name!, Tabs)
    app.component(TabItem.name!, TabItem)
  }
}

export const YuumiTabs = Tabs
export const YuumiTabItem = TabItem
