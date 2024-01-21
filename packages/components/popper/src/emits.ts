export const popperEmits = {
  "before-open": null,
  beforeOpen: null,
  "before-enter": (el: Element) => el instanceof Element,
  beforeEnter: (el: Element) => el instanceof Element,
  enter: (el: Element) => el instanceof Element,
  "after-enter": (el: Element) => el instanceof Element,
  afterEnter: (el: Element) => el instanceof Element,
  "before-leave": (el: Element) => el instanceof Element,
  beforeLeave: (el: Element) => el instanceof Element,
  leave: (el: Element) => el instanceof Element,
  "after-leave": (el: Element) => el instanceof Element,
  afterLeave: (el: Element) => el instanceof Element
}

export type PopperEmits = typeof popperEmits
