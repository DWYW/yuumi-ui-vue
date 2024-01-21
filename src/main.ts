import "./styles/index.scss"
import "../packages/styles/index.scss"

import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"
import YuumiUI from "../packages/index"
import ExamplePreview from "./components/ExamplePreview.vue"

const app = createApp(App)
app.use(router)
app.use(YuumiUI)
app.component("ExamplePreview", ExamplePreview)
app.mount("#app")
