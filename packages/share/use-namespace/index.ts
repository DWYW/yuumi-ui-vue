export function useNameSpace(name: string) {
  /** use BEM with Block */
  const b = (block: string) => `yuumi-${name}-${block}`
  /** use BEM with Element */
  const e = (element: string) => `yuumi-${name}__${element}`
  /** use BEM with Modifier */
  const m = (modifier: string) => `yuumi-${name}--${modifier}`
  /** use BEM with Block and Element */
  const be = (block: string, element: string) => `yuumi-${name}-${block}__${element}`
  const eb = (element: string, block: string) => `yuumi-${name}__${element}-${block}`
  /** use BEM with Block and Modifier */
  const bm = (block: string, modifier: string) => `yuumi-${name}-${block}--${modifier}`
  /** use BEM with Element and Modifier */
  const em = (element: string, modifier: string) => `yuumi-${name}__${element}--${modifier}`
  /** use BEM with Element and Modifier */
  const bem = (block: string, element: string, modifier: string) =>
    `yuumi-${name}-${block}__${element}--${modifier}`
  const ebm = (element: string, block: string, modifier: string) =>
    `yuumi-${name}__${element}-${block}--${modifier}`
  /** get namespace */
  const n = () => `yuumi-${name}`
  const is = (name: string, state?: boolean) => (state ? name : "")
  return {
    b,
    e,
    m,
    be,
    eb,
    bm,
    em,
    bem,
    ebm,
    n,
    is
  }
}
