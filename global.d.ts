declare module "vue" {
  export interface GlobalComponents {
    YuumiButton: typeof import("./packages")["YuumiButton"]
    YuumiCascader: typeof import("./packages")["YuumiCascader"]
    YuumiCheckbox: typeof import("./packages")["YuumiCheckbox"]
    YuumiCheckboxGroup: typeof import("./packages")["YuumiCheckboxGroup"]
    YuumiDatePicker: typeof import("./packages")["YuumiDatePicker"]
    YuumiDialog: typeof import("./packages")["YuumiDialog"]
    YuumiDivider: typeof import("./packages")["YuumiDivider"]
    YuumiDrawer: typeof import("./packages")["YuumiDrawer"]
    YuumiEmpty: typeof import("./packages")["YuumiEmpty"]
    YuumiIcon: typeof import("./packages")["YuumiIcon"]
    YuumiInput: typeof import("./packages")["YuumiInput"]
    YuumiNavs: typeof import("./packages")["YuumiNavs"]
    YuumiNumberInput: typeof import("./packages")["YuumiNumberInput"]
    YuumiPagination: typeof import("./packages")["YuumiPagination"]
    YuumiPopper: typeof import("./packages")["YuumiPopper"]
    YuumiRadio: typeof import("./packages")["YuumiRadio"]
    YuumiRadioGroup: typeof import("./packages")["YuumiRadioGroup"]
    YuumiRatioImage: typeof import("./packages")["YuumiRatioImage"]
    YuumiRatioRect: typeof import("./packages")["YuumiRatioRect"]
    YuumiScrollbar: typeof import("./packages")["YuumiScrollbar"]
    YuumiSelect: typeof import("./packages")["YuumiSelect"]
    YuumiSlider: typeof import("./packages")["YuumiSlider"]
    YuumiStep: typeof import("./packages")["YuumiStep"]
    YuumiSwitch: typeof import("./packages")["YuumiSwitch"]
    YuumiTable: typeof import("./packages")["YuumiTable"]
    YuumiTabs: typeof import("./packages")["YuumiTabs"]
    YuumiTimePicer: typeof import("./packages")["YuumiTimePicer"]
    YuumiTooltip: typeof import("./packages")["YuumiTooltip"]
    YuumiTree: typeof import("./packages")["YuumiTree"]
    YuumiWarning: typeof import("./packages")["YuumiWarning"]
  }

  export interface ComponentCustomProperties {
    $yuumi: import("./packages/plugins/alert").YuumiAlert &
      import("./packages/plugins/loading").YuumiLoading &
      import("./packages/plugins/message").YuumiMessage &
      import("./packages/plugins/notification").YuumiNotification
  }
}

export {}