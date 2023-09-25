<template>
  <div
    :class="[
      'yuumi-number-input',
      '_size-' + size,
      'btn-placement__' + btnPlacement,
      { '_actived': isActived }
    ]"
  >
    <div class="number__input">
      <input
        type="text"
        :disabled="disabled"
        :value="numberValue"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
    </div>

    <div
      v-if="showBtn"
      class="number__btn"
    >
      <div
        :class="['number__decrease', { '_disabled': decreaseDisabled }]"
        @click="onDecrease"
        @mouseenter="onBtnActivated(-1)"
        @mouseleave="onBtnDeactivated(-1)"
      >
        <YuumiIcon
          v-if="btnPlacement !== 'default'"
          icon="line-arrow-bottom"
        />
        <span v-else>-</span>
      </div>

      <div
        :class="['number__increase', { '_disabled': increaseDisabled }]"
        @click="onIncrease"
        @mouseenter="onBtnActivated(1)"
        @mouseleave="onBtnDeactivated(1)"
      >
        <YuumiIcon
          v-if="btnPlacement !== 'default'"
          icon="line-arrow-top"
        />
        <span v-else>+</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { isNumberInputPlacement, isValidComponentSize } from "../../../share/validator"

export default defineComponent({
  name: "YuumiNumberInput",
  props: {
    modelValue: { type: Number, default: 0 },
    size: { type: String, validator: isValidComponentSize, default: "md" },
    min: { type: Number, default: Number.MIN_SAFE_INTEGER },
    max: { type: Number, default: Number.MAX_SAFE_INTEGER },
    step: { type: Number, validator: (value: number) => value > 0 && value < Number.MAX_SAFE_INTEGER, default: 1 },
    disabled: { type: Boolean },
    showBtn: { type: Boolean, default: true },
    btnPlacement: { type: String, validator: isNumberInputPlacement, default: "default" }
  },
  emits: ["update:modelValue", "change", "input", "blur", "focus"],
  setup(props, { emit }) {
    /**---------- 初始化初始值 ----------*/
    function getInitValue(data: number) {
      if (data < props.min + 1) {
        data = props.min
      } else if (data > props.max - 1) {
        data = props.max
      }
      return data
    }
    const numberValue = ref(getInitValue(props.modelValue))
    watch(() => props.modelValue, (value) => {
      if (value !== numberValue.value) {
        numberValue.value = value
      }
    })

    const decreaseDisabled = computed(() => {
      return props.disabled || numberValue.value < props.min + 1
    })

    const increaseDisabled = computed(() => {
      return props.disabled || numberValue.value > props.max - 1
    })

    // 数字精度 0.1 + 0.2 = 0.30000000000000004
    const accuracy = computed(() => {
      const splits = props.step.toString().split(".") || [0, 0]
      return +splits[1]
    })

    /**---------- 定义事件 ----------*/
    function onDecrease() {
      if (props.disabled) return
      let _value = numberValue.value - props.step
      if (_value < props.min) {
        _value = props.min
      }

      numberValue.value = +_value.toFixed(accuracy.value)
    }

    function onIncrease() {
      if (props.disabled) return

      let _value = numberValue.value + props.step
      if (_value > props.max) {
        _value = props.max
      }

      numberValue.value = +_value.toFixed(accuracy.value)
    }

    function onInput(e: Event) {
      const target = e.target as HTMLInputElement
      // 检测输入的是否是合法数字
      if (target.value && !/^-?\d*(\.\d*)?$/.test(target.value)) {
        target.value = numberValue.value.toString()
      }

      emit("input", target.value)
    }

    function onChange(e: Event) {
      const target = e.target as HTMLInputElement
      let res = target.value
      // 将输入的字符串转为合法的字符串
      if (target.value === "") {
        res = "0"
      }

      res = res
        // 去除负数前面的多个零
        .replace(/^-0{2,}\./, "-0.")
        .replace(/^-0{2,}(?=\d+)/, "-")
        // 去除正数前面的多个零
        .replace(/^0{2,}\./, "0.")
        .replace(/^0{2,}(?=\d+)/, "")
        // 去除小数末尾的多个零
        .replace(/\.0*$/, "")
        .replace(/\.(\d+?)0*$/, ".$1")
0.
      target.value = (+res).toFixed(accuracy.value)
      numberValue.value = +target.value
    }

    const isActived = ref(false)

    function onFocus(e: Event) {
      isActived.value = true
      emit("focus", e)
    }

    function onBlur(e: Event) {
      isActived.value = false
      emit("blur", e)
    }

    function onBtnActivated(type: -1|1) {
      if (props.disabled) return
      if (type < 0 && decreaseDisabled.value) return
      if (type > 0 && increaseDisabled.value) return
      isActived.value = true
    }

    function onBtnDeactivated(type: -1|1) {
      if (props.disabled) return
      if (type < 0 && decreaseDisabled.value) return
      if (type > 0 && increaseDisabled.value) return
      isActived.value = false
    }

    watch(() => numberValue.value, (value, oldValue) => {
      emit("update:modelValue", value)
      if (value !== oldValue) {
        emit("change", value)
      }
    })

    return {
      numberValue,
      isActived,
      onDecrease,
      onIncrease,
      decreaseDisabled,
      increaseDisabled,
      onInput,
      onChange,
      onFocus,
      onBlur,
      onBtnActivated,
      onBtnDeactivated
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";

.yuumi-number-input {
  display: inline-block;
  @include Border();
  @include BorderRadius();
  overflow: hidden;
  box-sizing: border-box;
  transition: border 0.3s;
  position: relative;

  .number__decrease, .number__increase {
    box-sizing: border-box;
    flex: 0 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    @include FontSize("lg");
    @include TextColor("tertiary");
    @include BackgroundColorWithKey("light");
    transition: all 0.3s;
    line-height: 1;

    &:hover {
      @include BackgroundColorWithKey("primary");
      @include ColorWithKey("white");
    }

    &._disabled {
      cursor: no-drop;

      &:hover {
        @include BackgroundColorWithKey("light");
        @include TextColor("tertiary");
      }
    }
  }

  .number__input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    z-index: 1;

    input {
      text-align: center;
      width: 100%;
      height: 100%;
      @include Space("padding-left", "xm");
      @include Space("padding-right", "xm");
      border: none;
      outline: none;
      box-sizing: border-box;
      lighting-color: unset;
      font-size: inherit;

      &[disabled] {
        opacity: 0.5;
        cursor: no-drop;
      }
    }
  }

  .number__btn {
    position: absolute;
    top: 0;
    height: 100%;
    overflow: hidden;
  }

  &.btn-placement__default {
    .number__btn {
      position: absolute;
      left: 0;
      width: 100%;
    }

    .number__decrease, .number__increase {
      position: absolute;
      top: 0;
      height: 100%;
      z-index: 3;
    }

    .number__decrease {
      left: 0;
    }

    .number__increase {
      right: 0;
    }
  }

  &.btn-placement__left, &.btn-placement__right {
    .number__btn {
      display: flex;
      flex-direction: column-reverse;
    }

    .number__decrease, .number__increase {
      flex: 1 1 50%;
      position: relative;
      z-index: 3;
      @include FontSize("xm");
    }

    .number__increase::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      @include Border($attr: "border-bottom");
      transform: translateY(50%);
    }
  }

  &.btn-placement__left {
    .number__btn {
      left: 0;
    }

    .number__decrease, .number__increase {
      @include Border($attr: "border-right");
    }
  }

  &.btn-placement__right {
    .number__btn {
      right: 0;

      .number__decrease, .number__increase {
        @include Border($attr: "border-left");
      }
    }
  }

  @each $key,$value in $--height {
    &._size-#{$key} {
      width: $value * 4;
      height: $value;

      .number__decrease, .number__increase {
        width: $value;
      }

      &.btn-placement__default .number__input {
        padding: 0 $value;
      }

      &.btn-placement__left .number__input {
        padding-left: $value;
      }

      &.btn-placement__right .number__input {
        padding-right: $value;
      }
    }
  }

  &._actived {
    @include BorderColorWithKey("primary");
  }
}
</style>