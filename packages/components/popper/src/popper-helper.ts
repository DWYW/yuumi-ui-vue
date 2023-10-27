import { createPopper, Instance, Placement } from '@popperjs/core'
import { Ref, ref } from 'vue'

export function usePopperHelper() {
  const popper: Ref<Instance|null> = ref(null)

  function initailizePopper (el: HTMLElement, reference: HTMLElement, option: {
    placement: string,
    offset: [number, number],
    fallbackPlacements: string[]
  }) {
    popper.value = createPopper(reference, el, {
      placement: option.placement as Placement,
      modifiers: [{
        name: 'offset',
        options: {
          offset: option.offset
        },
      }, {
        name: 'arrow',
        options: {
          element: el.querySelector('.popper__arrow')
        },
      }, {
        name: 'flip',
        options: {
          fallbackPlacements: option.fallbackPlacements
        }
      }]
    })
  }

  function destroyPopper () {
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