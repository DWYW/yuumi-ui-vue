import type { App } from "vue"
import ButtonPlugin from "./components/button"
import CascaderPlugin from "./components/cascader"
import CheckboxPlugin from "./components/checkbox"
import CheckboxGroupPlugin from "./components/checkbox-group"
import DatePickerPlugin from "./components/date-picker"
import DialogPlugin from "./components/dialog"
import DividerPlugin from "./components/divider"
import DrawerPlugin from "./components/drawer"
import EmptyPlugin from "./components/empty"
import IconPlugin from "./components/icon"
import InputPlugin from "./components/input"
import NavsPlugin from "./components/navs"
import NumberInput from "./components/number-input"
import PaginationPlugin from "./components/pagination"
import PopperPlugin from "./components/popper"
import RadioPlugin from "./components/radio"
import RadioGroupPlugin from "./components/radio-group"
import RatioImagePlugin from "./components/ratio-image"
import RatioRectPlugin from "./components/ratio-rect"
import ScrollbarPlugin from "./components/scrollbar"
import SelectPlugin from "./components/select"
import SliderPlugin from "./components/slider"
import StepPlugin from "./components/step"
import SwitchPlugin from "./components/switch"
import TablePlugin from "./components/table"
import TabsPlugin from "./components/tabs"
import TimePicerPlugin from "./components/time-picker"
import TooltipPlugin from "./components/tooltip"
import TreePlugin from "./components/tree"
import WarningPlugin from "./components/warning"

import * as AlertPlugin from "./plugins/alert"
import * as LoadingPlugin from "./plugins/loading"
import * as MessagePlugin from "./plugins/message"
import * as NotificationPlugin from "./plugins/notification"

import LoadingDirective from "./directives/loading"

export * from "./components/button"
export * from "./components/cascader"
export * from "./components/checkbox"
export * from "./components/checkbox-group"
export * from "./components/date-picker"
export * from "./components/dialog"
export * from "./components/divider"
export * from "./components/drawer"
export * from "./components/empty"
export * from "./components/icon"
export * from "./components/input"
export * from "./components/navs"
export * from "./components/number-input"
export * from "./components/pagination"
export * from "./components/popper"
export * from "./components/radio"
export * from "./components/radio-group"
export * from "./components/ratio-image"
export * from "./components/ratio-rect"
export * from "./components/scrollbar"
export * from "./components/select"
export * from "./components/slider"
export * from "./components/step"
export * from "./components/switch"
export * from "./components/table"
export * from "./components/tabs"
export * from "./components/time-picker"
export * from "./components/tooltip"
export * from "./components/warning"

export * from "./plugins/alert"
export * from "./plugins/loading"
export * from "./plugins/message"
export * from "./plugins/notification"

export default {
  install: (app: App): void => {
    app.use(ButtonPlugin)
    app.use(CascaderPlugin)
    app.use(CheckboxPlugin)
    app.use(CheckboxGroupPlugin)
    app.use(DatePickerPlugin)
    app.use(DialogPlugin)
    app.use(DividerPlugin)
    app.use(DrawerPlugin)
    app.use(EmptyPlugin)
    app.use(IconPlugin)
    app.use(InputPlugin)
    app.use(NavsPlugin)
    app.use(NumberInput)
    app.use(PaginationPlugin)
    app.use(PopperPlugin)
    app.use(RadioPlugin)
    app.use(RadioGroupPlugin)
    app.use(RatioImagePlugin)
    app.use(RatioRectPlugin)
    app.use(ScrollbarPlugin)
    app.use(SelectPlugin)
    app.use(SliderPlugin)
    app.use(StepPlugin)
    app.use(SwitchPlugin)
    app.use(TablePlugin)
    app.use(TabsPlugin)
    app.use(TimePicerPlugin)
    app.use(TooltipPlugin)
    app.use(TreePlugin)
    app.use(WarningPlugin)

    app.config.globalProperties.$yuumi = {
      ...AlertPlugin,
      ...LoadingPlugin,
      ...MessagePlugin,
      ...NotificationPlugin
    }

    app.use(LoadingDirective)
  }
}
