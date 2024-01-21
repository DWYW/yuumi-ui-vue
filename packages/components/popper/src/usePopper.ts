import { createPopper, Instance, Placement } from "@popperjs/core"
import { Ref, ref } from "vue"

export function usePopper() {
  const popper: Ref<Instance | null> = ref(null)

  function initailizePopper(
    el: HTMLElement,
    reference: HTMLElement,
    option: {
      placement: string
      offset: [number, number]
      fallbackPlacements: string[]
    }
  ) {
    popper.value = createPopper(reference, el, {
      placement: option.placement as Placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: option.offset
          }
        },
        {
          name: "arrow",
          options: {
            element: el.querySelector(".yuumi-popper__arrow"),
            padding: ({ popper, reference, placement }: any) => {
              // fix: poper尺寸小于reference时，arrow显示问题
              if (/^(top|bottom)/.test(placement) && popper.width < reference.width) {
                return popper.width / 2 - 6
              }

              if (/^(left|right)/.test(placement) && popper.height < reference.height) {
                return popper.height / 2 - 6
              }

              return 6
            }
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: option.fallbackPlacements
          }
        }
      ]
    })
  }

  function destroyPopper() {
    if (!popper.value) return
    popper.value.destroy()
    popper.value = null
  }

  return {
    popper,
    initailizePopper,
    destroyPopper
  }
}
