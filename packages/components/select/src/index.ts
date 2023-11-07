import { arrayPatch } from '../../../share/helper'
import { isValidComponentSize, isValidComponentTheme } from '../../../share/validator'
import { computed, createVNode, defineComponent, Fragment, h, mergeProps, nextTick, onMounted, ref, resolveComponent, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import useClear from './clear-helper'
import useHelper from './helper'
import useKeyword from './keyword-helper'
import useOptins from './options-helper'

export default defineComponent({
  name: 'YuumiSelect',
  inheritAttrs: false,
  props: {
    modelValue: [String, Array],
    disabled: Boolean,
    multiple: Boolean,
    readonly: Boolean,
    placeholder: { type: String, default: '请选择' },
    size: { type: String, validator: isValidComponentSize, default: 'md' },
    theme: { type: String, validator: isValidComponentTheme, default: 'default' },
    defaultValueOptions: (Array as unknown) as any[],
    options: { type: Array, default: () => [] },
    optionKey: { type: Object, default: () => ({ label: 'label', value: 'value'}) },
    filterable: Boolean,
    filterMethod: Function,
    clearable: Boolean,
    emptyPlaceholder: { type: String, default: '暂无可选项' },
    initLoadData: { type: Function as PropType<() => Promise<any>> }
  },
  setup (props) {
    const { getLabel, getValue } = useHelper()

    const popperComponent: Ref<any> = ref()
    const selectElement: Ref<HTMLElement|undefined> = ref()

    const selectedItems: Ref<any[]> = ref([])
    const labelSpans = computed(() => selectedItems.value.map(item => getLabel(item)))

    const isActivedState = computed(() =>{
      if (!popperComponent.value) return false
      return popperComponent.value.visible as boolean
    })

    const optionItems: Ref<any[]> = ref(props.options)

    const isLoading = ref(false)
    // 初始化时如果有initLoadData则选择自动加载
    if (typeof props.initLoadData === 'function') {
      isLoading.value = true
      Promise.resolve(props.initLoadData()).then((res) => {
        optionItems.value = res
        updateSelectedItems()
      }).finally(() => {
        isLoading.value = false
      })
    }

    // 同步options
    watch(() => props.options, () => {
      optionItems.value = props.options
    })

    const { getOptionItemIndexInSelected, onSelectItem, removeSelectedByIndex, onScrollInit, optionsMinWidth, updateOptionsMinWidth } = useOptins(selectedItems)
    const { keywordPlaceholder, keyword, onKeywordInput, validOptions, keywordInputFocus, restoreKeywordValue } = useKeyword()
    const { clearBtnVisible, clearHalk, tryHideClearBtn, tryShowclearBtn } = useClear()

    function onBeforeEnter () {
      if (props.filterable) keywordInputFocus()
    }

    function onBeforeLeave () {
      if (props.filterable) restoreKeywordValue()
    }

    onMounted(() => {
      // fixed: 弹出层和目标层宽度不一致
      // fixed: 当在drawer中,由于display：none, 宽度为0的问题,使用setTimeout替代nextTick
      setTimeout(() => {
        nextTick(updateOptionsMinWidth)
      })
    })


    function updateSelectedItems() {
      let _selectedItems: any[] = []

      const _options = [].concat(optionItems.value as any, props.defaultValueOptions as any)
      if (props.modelValue instanceof Array && props.multiple) {
        _selectedItems = _options.filter((option: any) => {
          return (props.modelValue as any).find((item: any) => item === getValue(option))
        })
      } else if (props.modelValue) {
        _selectedItems = _options.filter((option: any) => props.modelValue === getValue(option))
      }

      arrayPatch(selectedItems.value, _selectedItems)
    }

    watch(() => props.modelValue, () =>{
      updateSelectedItems()

      // 更新keyword
      if (props.filterable) {
        nextTick(restoreKeywordValue)
      }

      if (props.multiple) {
        nextTick(updateOptionsMinWidth)
      }
    }, { deep: true, immediate: true })

    return {
      getLabel,
      getValue,
      isLoading,
      optionItems,
      popperComponent,
      selectElement,
      selectedItems,
      labelSpans,
      isActivedState,
      getOptionItemIndexInSelected,
      onSelectItem,
      removeSelectedByIndex,
      keywordPlaceholder,
      keyword,
      onKeywordInput,
      validOptions,
      optionsMinWidth,
      onScrollInit,
      onBeforeEnter,
      onBeforeLeave,
      clearBtnVisible,
      onMouseenter: tryShowclearBtn,
      onMouseleave: tryHideClearBtn,
      onClear: (event: MouseEvent) => {
        event.stopPropagation()
        clearHalk()
      }
    }
  },
  render () {
    const _YuumiPopper = resolveComponent('YuumiPopper')
    const _YuumiIcon = resolveComponent('YuumiIcon')
    const _YuumiScrollbar = resolveComponent('YuumiScrollbar')

    const getIcon = () => {
      const { clearBtnVisible, onClear, isLoading } = this

      const getIconProp = () => {
        if (isLoading) {
          return {
            class: 'select__icon',
            icon: 'line-loading'
          }
        }

        if (clearBtnVisible) {
          return {
            class: 'select__icon',
            icon: 'line-circle-close',
            onClick: onClear
          }
        }

        return {
          class: 'select__icon __arrow',
          icon: 'flat-arrow-bottom'
        }
      }

      return h(createVNode(_YuumiIcon, getIconProp()))
    }

    const getContentVnode = () => {
      const { $props, isActivedState, labelSpans, keywordPlaceholder, removeSelectedByIndex, onKeywordInput } = this
      const { keyword } = this

      if ($props.filterable && !$props.multiple) {
        return h('input', {
          readonly: !isActivedState,
          placeholder: keywordPlaceholder,
          ref: 'keywordInput',
          value: keyword,
          'onInput': onKeywordInput
        })
      }

      return h(Fragment, null, [
        h(Fragment, null, labelSpans.map((item, index) => h('span', { class: 'content-item' }, [
          h('span', null, [item]),
          $props.multiple && !$props.readonly && !$props.disabled ? h(_YuumiIcon, {
            icon: 'flat-circle-close',
            onClick: (e: any) => removeSelectedByIndex(index, e)
          }): undefined
        ]))),

        labelSpans.length === 0 ? h('span', { class: 'select__placeholder' }, [
          $props.placeholder
        ]): undefined
      ])
    }

    const getTriggerVnode = () => {
      const { $props, $attrs, isActivedState, onMouseenter, onMouseleave } = this
      const _props = mergeProps({
        class: ['yuumi-select', `theme__${$props.theme}`, `size__${$props.size}`, {
          '__focus': isActivedState,
          '__readonly': $props.readonly,
          '__disabled': $props.disabled,
          '__multiple': $props.multiple
        }],
        onMouseenter,
        onMouseleave,
        ref: 'selectElement'
      }, $attrs)

      return h('div', _props, [
        h('div', { class: 'select__content' }, [getContentVnode()]),
        getIcon()
      ])
    }

    const getOptionMenus = () => {
      const { $props, validOptions, emptyPlaceholder, getOptionItemIndexInSelected, onSelectItem, getLabel } = this

      const children = validOptions.map((item: any) => {
        return h('li', {
          class: ['option-item', {
            '__selected': getOptionItemIndexInSelected(item) > -1
          }],
          onClick: () => onSelectItem(item)
        }, [
          h('span', null, getLabel(item)),
          h(_YuumiIcon, { icon: 'line-correct' })
        ])
      })

      if (!validOptions.length) {
        children.push(h('li', {
          class: 'option-item placeholder'
        }, [emptyPlaceholder]))
      }

      return h('ul', {
        class: ['yuumi-select-options', `theme__${$props.theme}`],
      }, children)
    }

    const getOptionsVnode = () => {
      const { onScrollInit, optionsMinWidth } = this

      return createVNode(_YuumiScrollbar, {
        class: 'options-wrap ',
        style: { minWidth: `${optionsMinWidth}px` },
        onInit: onScrollInit
      }, {
        default: getOptionMenus
      })
    }

    const { onBeforeEnter, onBeforeLeave } = this

    return createVNode(_YuumiPopper, {
      class: "yuumi-select__popper",
      placement: 'bottom-start',
      fallbackPlacements: ['top-start'],
      onBeforeEnter,
      onBeforeLeave,
      ref: "popperComponent"
    }, {
      trigger: () => h(getTriggerVnode(), {
        readonly: this.readonly,
        disabled: this.disabled
      }),
      default: () => getOptionsVnode()
    })
  }
})
