<template>
  <div :class="['yuumi-slider', vertical ? '_vertical' : '_horizontal', { '_disabled': disabled }]">
    <div
      ref="content"
      class="slider__content"
      :style="contentStyle"
    >
      <div
        class="slider__bar"
        :style="sliderBarStyle"
      >
        <div
          v-if="range"
          class="bar__min"
          :style="minBarStyle"
        />

        <div
          class="bar__max"
          :style="maxBarStyle"
        />

        <div class="slider__stops">
          <div
            v-for="item,index in stops"
            :key="index"
            class="stop-item"
            :style="item"
          />
        </div>
      </div>

      <div class="slider__btn">
        <YuumiPopper
          v-if="range"
          ref="poppers[0]"
          class="slider__tooltip"
          type="custom"
          :placement="tooltipPlacement"
        >
          <div class="slider__value">
            {{ formatter ? formatter(currentValue[0]) : currentValue[0] }}
          </div>
          <template #trigger>
            <div
              :class="['btn__min', { '_selected': activedIndex === 0 }]"
              :style="minBtnStyle"
              data-index="0"
              @mousedown="onStart"
              @mouseenter="onMouseEnter"
              @mouseleave="onMouseLeave"
            />
          </template>
        </YuumiPopper>

        <YuumiPopper
          ref="poppers[1]"
          class="slider__tooltip"
          type="custom"
          :placement="tooltipPlacement"
        >
          <div class="slider__value">
            {{ formatter ? formatter(currentValue[1]) : currentValue[1] }}
          </div>
          <template #trigger>
            <div
              :class="['btn__max', { '_selected': activedIndex === 1 }]"
              :style="maxBtnStyle"
              data-index="1"
              @mousedown="onStart"
              @mouseenter="onMouseEnter"
              @mouseleave="onMouseLeave"
            />
          </template>
        </YuumiPopper>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue'
import { useEvent } from './event-helper'
import { useTooltip } from "./tooltip-helper"
import { isValidComponentPlacement } from '../../../share/validator'
import type { ComponentInternalInstance, PropType } from 'vue'

export default defineComponent({
  name: 'YuumiSlider',
  props: {
    modelValue: { type: [Number, Array] as PropType<number|Array<number>> },
    disabled: { type: Boolean },
    range: { type: Boolean },
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    size: { type: Number, default: 6 },
    btnColor: { type: String },
    colors: { type: Array as PropType<Array<string>> },
    backgroundColors: { type: Array as PropType<Array<string>> },
    formatter: { type: Function },
    showTooltip: { type: Boolean, default: true },
    showStops: { type: Boolean },
    vertical: { type: Boolean },
    reverse: { type: Boolean },
    placement: { type: String, validator: isValidComponentPlacement }
  },
  emits: ["update:modelValue", "change", "changing"],
  setup(props, { emit }) {
    const instace = getCurrentInstance() as ComponentInternalInstance
    // 较少心智负担
    const reallyMin = computed(() => Math.min(props.min, props.max))
    const reallyMax = computed(() => Math.max(props.min, props.max))

    function getValueByModel() {
      const _initValue = [reallyMin.value, reallyMin.value]
      if (props.modelValue && props.modelValue instanceof Array) {
        let startValue = Math.min(...props.modelValue)
        if (startValue < reallyMin.value) {
          startValue = reallyMin.value
        }

        let endValue = Math.max(...props.modelValue)
        if (endValue > reallyMax.value) {
          endValue = reallyMax.value
        }
        _initValue[0] = startValue
        _initValue[1] = endValue
      } else if (typeof props.modelValue === 'number') {
        let _value = props.modelValue || 0

        if (_value > reallyMax.value) {
          _value = reallyMax.value
        } else if (_value < reallyMin.value) {
          _value = reallyMin.value
        }

        _initValue[1] = _value
      }

      return _initValue
    }
    // 用作实时显示
    const currentValue = ref(getValueByModel())
    // 用作最后的确认值
    const confirmValue = ref(getValueByModel())
    // 被动改变
    watch(() => (props.modelValue||[]).toString(), (value) => {
      if (!value || value === confirmValue.value.toString()) return
      currentValue.value = getValueByModel()
      confirmValue.value = getValueByModel()
    })

    const total = computed(() => Math.abs(reallyMax.value - reallyMin.value))
    const tooltipPlacement = computed(() => {
      return props.placement || (props.vertical ? "right" : "top")
    })

    const contentStyle = computed(() => {
      const _style: {[x:string]: string} = {}
      if (props.vertical) {
        _style.width = `${props.size}px`
        _style.height = `calc(100% - ${props.size * 6}px)`
        _style.margin = `${props.size * 3}px ${props.size * 2}px`
      } else {
        _style.height = `${props.size}px`
        _style.margin = `${props.size * 2}px ${props.size * 3}px`
      }
      return _style
    })

    const barStyle = computed(() => {
      const _style: {[x:string]: string} = {}
      if (!props.backgroundColors) return _style
      if (props.backgroundColors.length > 1) {
        const angle = props.vertical ? props.reverse ? "180deg" : "0deg" : "90deg"
        _style.backgroundImage = `linear-gradient(${angle}, ${props.backgroundColors.toString()})`
      } else {
        _style.backgroundColor = props.backgroundColors[0]
      }
      return _style
    })

    const minBarStyle = computed(() => {
      const _style = Object.assign({}, barStyle.value)
      const _value = currentValue.value[0] - reallyMin.value
      const methods: {[x:string]: () => void} = {
        "true:true": () => {
          _style.top = `${(_value / total.value - 1) * 100}%`
        },
        "true:false": () => {
          _style.top = `${(1 - _value / total.value) * 100}%`
        },
        "false:true": () => {
          _style.left = `${(1 - _value / total.value) * 100}%`
        },
        "false:false": () => {
          _style.left = `${(_value / total.value - 1) * 100}%`
        },
      }
      methods[`${props.vertical}:${props.reverse}`]()
      return _style
    })

    const maxBarStyle = computed(() => {
      const _style = Object.assign({}, barStyle.value)
      const _value = currentValue.value[1] - reallyMin.value
      const methods: {[x:string]: () => void} = {
        "true:true": () => {
          _style.top = `${_value / total.value * 100}%`
        },
        "true:false": () => {
          _style.top = `${(0 - _value / total.value) * 100}%`
        },
        "false:true": () => {
          _style.left = `${(0 -  _value / total.value) * 100}%`
        },
        "false:false": () => {
          _style.left = `${_value / total.value * 100}%`
        },
      }
      methods[`${props.vertical}:${props.reverse}`]()
      return _style
    })

    const sliderBarStyle = computed(() => {
      const _style: {[x:string]: string} = {}
      if (props.disabled || !props.colors) return _style
      if (props.colors.length > 1) {
        const angle = props.vertical ? props.reverse ? "180deg" : "0deg" : "90deg"
        _style.backgroundImage = `linear-gradient(${angle}, ${props.colors.toString()})`
      } else {
        _style.backgroundColor = props.colors[0]
      }
      return _style
    })

    const btnStyle = computed(() => {
      return <{[x:string]: string}>{
        width: `${props.size*3}px`,
        height: `${props.size*3}px`,
        borderColor: props.disabled ? "" : props.btnColor
      }
    })

    const minBtnStyle = computed(() => {
      const _style = Object.assign({}, btnStyle.value)
      const _value = currentValue.value[0] - reallyMin.value
      const methods: {[x:string]: () => void} = {
        "true:true": () => {
          _style.top = `${_value / total.value * 100}%`
        },
        "true:false": () => {
          _style.top = `${(1 - _value / total.value) * 100}%`
        },
        "false:true": () => {
          _style.left = `${(1 - _value / total.value) * 100}%`
        },
        "false:false": () => {
          _style.left = `${(_value / total.value) * 100}%`
        },
      }
      methods[`${props.vertical}:${props.reverse}`]()
      return _style
    })

    const maxBtnStyle = computed(() => {
      const _style = Object.assign({}, btnStyle.value)
      const _value = currentValue.value[1] - reallyMin.value
      const methods: {[x:string]: () => void} = {
        "true:true": () => {
          _style.bottom = `${(1 - _value / total.value) * 100}%`
        },
        "true:false": () => {
          _style.bottom = `${_value / total.value * 100}%`
        },
        "false:true": () => {
          _style.right = `${_value / total.value * 100}%`
        },
        "false:false": () => {
          _style.right = `${(1 - _value / total.value) * 100}%`
        },
      }
      methods[`${props.vertical}:${props.reverse}`]()
      return _style
    })

    const stops = computed(() => {
      if (!props.showStops) return []
      const num = Math.floor(total.value / props.step)
      const res: any[] = []
      for(let i = 1; i < num; i++) {
        res[i - 1] = {
          width: `${props.size / 2}px`,
          height: `${props.size / 2}px`
        }

        if (props.vertical) {
          res[i - 1].top = `${i / num * 100}%`
        } else {
          res[i - 1].left = `${i / num * 100}%`
        }
      }
      return res
    })

    // 用于记录首次激活的索引值
    let index = 0
    // 用于记录实现激活的索引值
    const activedIndex = ref(-1)

    const { onMousedown } = useEvent((detail) => {
      const getNextValue = () => {
        if (!instace.proxy) return confirmValue.value[index]
        const el = instace.proxy.$refs.content as HTMLElement
        const maps: {[x:string]: () => number} = {
          "true:true": () => detail.vertical / el.clientHeight * total.value,
          "true:false": () => (0 - detail.vertical) / el.clientHeight * total.value,
          "false:true": () => (0 - detail.horizontal) / el.clientWidth * total.value,
          "false:false": () => detail.horizontal / el.clientWidth * total.value,
        }
        const _value = maps[`${props.vertical}:${props.reverse}`]()
        let nextValue = Math.round(_value + confirmValue.value[index])
        if (nextValue > reallyMax.value) {
          nextValue = reallyMax.value
        } else if (nextValue < reallyMin.value) {
          nextValue = reallyMin.value
        }

        // 处理步长
        nextValue = Math.round(nextValue / props.step) *props.step
        return nextValue
      }

      const normalUpdate = (value: number) => {
        activedIndex.value = index
        if (detail.done) {
          activedIndex.value = -1
          confirmValue.value[index] = currentValue.value[index]
        } else {
          currentValue.value[index] = value
          currentValue.value[index^1] = confirmValue.value[index^1]
        }
      }

      const specialUpdate = (value: number) => {
        activedIndex.value = index^1
        if (detail.done) {
          activedIndex.value = -1
          confirmValue.value[index] = currentValue.value[index]
          confirmValue.value[index^1] = currentValue.value[index^1]
        } else {
          currentValue.value[index] = confirmValue.value[index^1]
          currentValue.value[index^1] = value
        }
      }

      const updateValue = [
        (value: number) => {
          value <= confirmValue.value[1] ? normalUpdate(value) : specialUpdate(value)
        },
        (value: number) => {
          value >= confirmValue.value[0] ? normalUpdate(value) : specialUpdate(value)
        }
      ]

      updateValue[index](getNextValue())
    })

    function onStart(e: MouseEvent) {
      if (props.disabled) return
      index = Number((<HTMLElement>e.target).dataset.index || "0")
      onMousedown(e)
    }

    const { showPopper, updatePopper, hidePopper } = useTooltip(instace)
    function onMouseEnter(e: MouseEvent) {
      if (activedIndex.value !== -1) return
      setTimeout(() => {
        showPopper((<HTMLElement>e.target).dataset.index || "0")
      })
    }

    function onMouseLeave(e: MouseEvent) {
      if (activedIndex.value === -1) {
        hidePopper((<HTMLElement>e.target).dataset.index || "0")
      }
    }

    watch(() => currentValue.value.toString(), (value, oldValue) => {
      if (value === oldValue) return
      const _value = props.range ? currentValue.value : currentValue.value[1]
      emit("changing", _value)

      if (activedIndex.value === -1) return
      updatePopper(activedIndex.value)
    })

    watch(() => activedIndex.value, (value, oldValue) => {
      if (value === oldValue) return
      if (value !== -1) showPopper(value)
      if (oldValue !== -1) hidePopper(oldValue)
    })

    watch(() => confirmValue.value.toString(), (value, oldValue) => {
      if (value === oldValue) return
      if (props.modelValue && props.modelValue.toString() === value) return
      const _value = props.range ? confirmValue.value : confirmValue.value[1]
      emit("update:modelValue", _value)
      emit("change", _value)
    })

    return {
      currentValue,
      confirmValue,
      contentStyle,
      sliderBarStyle,
      minBarStyle,
      maxBarStyle,
      minBtnStyle,
      maxBtnStyle,
      activedIndex,
      onStart,
      onMouseEnter,
      onMouseLeave,
      tooltipPlacement,
      stops
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";

.yuumi-slider {
  overflow: hidden;
  user-select: none;

  .slider__content {
    position: relative;
    box-sizing: border-box;

    .slider__bar {
      width: 100%;
      height: 100%;
      @include BorderRadius("round");
      @include BackgroundColorWithKey("primary");
      position: relative;
      overflow: hidden;
    }

    .bar__min, .bar__max {
      width: 100%;
      height: 100%;
      position: absolute;
      @include BorderRadius("round");
      @include BackgroundColorWithKey("placeholder");
      background-attachment: fixed;
      background-repeat: no-repeat;
    }

    .slider__stops {
      position: absolute;

      .stop-item {
        position: absolute;
        @include BorderRadius("circle");
        @include BackgroundColorWithKey("white");
      }
    }

    .slider__btn {
      position: absolute;
    }

    .btn__min, .btn__max {
      @include BorderRadius("circle");
      @include BackgroundColorWithKey("white");
      @include Border($width:2px, $key:"primary");
      position: absolute;
      cursor: grab;
      transition: transform 0.3s, border 0.3s;
    }
  }

  &._disabled {
    .slider__content {
      .slider__bar {
        @include BackgroundColorWithKey("disabled");
      }

      .bar__min, .bar__max {
        @include BackgroundColorWithKey("light");
      }

      .btn__min, .btn__max {
        cursor: no-drop;
        @include BorderColorWithKey($key:"disabled");
      }
    }
  }

  &._vertical {
    height: 100%;
    display: inline-block;

    .slider__btn {
      height: 100%;
      left: 50%;
      top: 0;
    }

    .bar__min {
      top: -100%;
    }

    .bar__max {
      top: 0;
    }

    .slider__stops {
      height: 100%;
      left: 50%;
      transform: translateX(-50%);

      .stop-item {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .btn__min {
      top: 0;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      &:hover, &._selected {
        transform: translate3d(-50%, -50%, 0) scale(1.2);
      }
    }

    .btn__max {
      left: 50%;
      bottom: 100%;
      transform: translate3d(-50%, 50%, 0);

      &:hover, &._selected {
        transform: translate3d(-50%, 50%, 0) scale(1.2);
      }
    }

    &._disabled {
      .btn__min:hover {
        transform: translate3d(-50%, -50%, 0) scale(1);
      }

      .btn__max:hover {
        transform: translate3d(-50%, 50%, 0) scale(1);
      }
    }
  }

  &._horizontal {
    width: 100%;
    .slider__btn {
      width: 100%;
      left: 0;
      top: 50%;
    }

    .bar__min {
      left: -100%;
    }

    .bar__max {
      left: 0;
    }

    .slider__stops {
      width: 100%;
      top: 50%;
      transform: translateY(-50%);

      .stop-item {
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .btn__min {
      top: 50%;
      left: 0;
      transform: translate3d(-50%, -50%, 0);
      &:hover, &._selected {
        transform: translate3d(-50%, -50%, 0) scale(1.2);
      }
    }

    .btn__max {
      top: 50%;
      right: 100%;
      transform: translate3d(50%, -50%, 0);

      &:hover, &._selected {
        transform: translate3d(50%, -50%, 0) scale(1.2);
      }
    }

    &._disabled {
      .btn__min:hover {
        transform: translate3d(-50%, -50%, 0) scale(1);
      }

      .btn__max:hover {
        transform: translate3d(50%, -50%, 0) scale(1);
      }
    }
  }
}

.slider__tooltip {
  .slider__value {
      @include BorderColorWithKey("dark");
      @include BackgroundColorWithKey("dark");
      @include ColorWithKey("white");
      @include Space("padding-top", "xm");
      @include Space("padding-bottom", "xm");
      @include Space("padding-left", "sm");
      @include Space("padding-right", "sm");
      @include BorderRadius();
      @include FontSize("xm");
    }

    @each $type in ('top', 'bottom', 'left', 'right') {
      &[data-popper-placement^=#{$type}] {
        .popper__arrow {
          @include BorderColorPartail($attr: $type, $key: "dark");

          &::after {
            @include BorderColorPartail($attr: $type, $key: "dark");
          }
        }
      }
    }
}
</style>