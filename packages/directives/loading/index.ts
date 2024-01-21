import { createLoading, removeLoading, getLoadingId, getLoadingWithId } from "../../plugins/loading"
import type { App } from "vue"

function showLoading(loadingId: string, spinner?: any) {
  const target = getLoadingWithId(loadingId)

  if (target) {
    target[1].show()
  } else {
    createLoading({
      uuid: loadingId,
      teleport: `[data-loading-id="${loadingId}"]`,
      spinner
    })
  }
}

function hideLoading(loadingId: string) {
  const target = getLoadingWithId(loadingId)
  if (target) removeLoading(target[0])
}

export default {
  install: (app: App) => {
    app.directive("loading", {
      // 在绑定元素的 attribute 或事件监听器被应用之前调用
      created(el, binding) {
        const loadingId = getLoadingId()
        el.dataset.loadingId = loadingId

        const _value = binding.value
        if (typeof _value === "boolean" && _value) {
          showLoading(loadingId)
        } else if (_value.value) {
          showLoading(loadingId, _value.spinner)
        }
      },
      // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
      updated(el, binding) {
        const loadingId = el.dataset.loadingId

        const _value = binding.value
        if (typeof _value === "boolean" && _value) {
          showLoading(loadingId)
        } else if (_value.value) {
          showLoading(loadingId, _value.spinner)
        } else {
          hideLoading(loadingId)
        }
      }
    })
  }
}
