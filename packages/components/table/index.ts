import type { App } from "vue"
import Table from "./src/Index.vue"
import TableColumn from "./src/Column.vue"

export default {
  install: (app: App): void => {
    app.component(Table.name, Table)
    app.component(TableColumn.name, TableColumn)
  }
}

export const YuumiTable = Table
export const YuumiTableColumn = TableColumn
