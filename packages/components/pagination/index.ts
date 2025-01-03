import type { App } from "vue"
import Pagination from "./src/Index.vue"

export default {
  install: (app: App): void => {
    app.component(Pagination.name!, Pagination)
  }
}

export const YuumiPagination = Pagination
