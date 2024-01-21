export const notificationEmits = {
  beforeEnter: (el: Element) => el instanceof Element,
  "before-enter": (el: Element) => el instanceof Element,
  afterEnter: (el: Element) => el instanceof Element,
  "after-enter": (el: Element) => el instanceof Element,
  beforeLeave: (el: Element) => el instanceof Element,
  "before-leave": (el: Element) => el instanceof Element,
  afterLeave: (el: Element) => el instanceof Element,
  "after-leave": (el: Element) => el instanceof Element
}

export type NotificationEmits = typeof notificationEmits
