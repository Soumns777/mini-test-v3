<!--
   * @FileDescription: custom form item template
   * @Author: Soumns
   * @Node: sFormItem
   * @Date: 2023年12月12日15:33:07
-->
<script setup name="sFormItem">
import './index.scss';
import {toast} from "@/services/promiseApi.js";
import {autoType, useVerify} from "@/hooks/useVerifyRules.js";
import {INPUT_ALIGN_TYPE} from "@/libs/constant.js";

const emits = defineEmits()
const props = defineProps({
  inpVal: {
    type: [String, Number],
    required: false,
  },
  defineConfig: {
    type: Object,
    required: true,
  },
  cellData: {
    type: Array,
    required: true,
  },
  inputAlign: {
    type: String,
    required: false,
    default: 'left'
  },
  labelWidth: {
    type: [Number, String],
    required: false,
    default: '200'
  }
})
const {
  inpVal,
  defineConfig,
  cellData,
  inputAlign,
  labelWidth
} = toRefs(props)


/**
 * @desc dyniamic-input-align
 */
const dynamicInpAlign = computed(() => {
  return () => {
    switch (inputAlign.value) {
      case INPUT_ALIGN_TYPE.LEFT: {
        return ['text-left', 'left-0']
      }
      case INPUT_ALIGN_TYPE.CENTER: {
        return ['text-center', 'left-140']
      }
      case INPUT_ALIGN_TYPE.RIGHT: {
        return ['text-right', 'right-0']
      }
      default: {
        return ['text-left', 'left-0']
      }
    }
  }
})

/**
 * @desc dynamic-label-width
 */
const dynamicLabelWidth = computed(() => {
  return labelWidth.value + 'rpx'
})

/**
 * @desc dynamic-show-line
 */
const dynamicShowLine = computed(() => {
  return (prop, prop1) => {
    return prop != prop1
  }
})

/**
 * @desc dynamic-placeholder-content
 */
const dynamicPlaceholder = computed(() => {
  return () => {
    if (defineConfig.value.suffixIcon) {
      return `请选择${defineConfig.value.label}`
    } else {
      return `请输入${defineConfig.value.label}`
    }
  }
})

/**
 * @desc dynamic-disabled
 */
const dynamicDisabled = computed(() => {
  return (isDisabled, isSelect) => {
    if (isDisabled || isSelect) {
      return true
    } else {
      return false
    }
  }
})

/**
 * @desc input-change-event
 */
let errorMessage = ref("")
const handleChange = async (e) => {
  try {
    emits('update:inpVal', e.detail.value)
    await handleVerify(e.detail.value)
  } catch (e) {
  }
}

const handleVerify = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      let formRules = useVerify(defineConfig.value.prop)
      for (let idx = 0; idx < formRules.length; idx++) {
        let current = formRules[idx]
        if (current.required && !value) {
          errorMessage.value = current.message
          return reject(current.message)
        } else if (current.validator && !(current.validator(value))) {
          errorMessage.value = current.message
          return reject(current.message)
        } else {
          errorMessage.value = ''
        }
        if (idx >= formRules.length - 1) {
          resolve()
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}
defineExpose({
  handleVerify
})


</script>

<template>
  <!-- form-item组件 -->
  <view f-col>
    <view f-c j-c-b h-120 pl-50 pr-30>
      <!-- 前置插槽 -->
      <slot name="prefix"/>

      <!-- label -->
      <view f-c pr :style="{width:dynamicLabelWidth}" flex-justify-start>
        <text text="40 #f56c6c" pa top--2 left--20>*</text>
        <text text="30 #303133">{{ defineConfig.label }}</text>
      </view>

      <!-- input -->
      <view f-col f-c pr f-1>
        <input :type="autoType(defineConfig.prop)" :placeholder="dynamicPlaceholder()"
               @input="handleChange" :value="inpVal"
               placeholder-class="placeholderClass" w-all
               :disabled="dynamicDisabled(defineConfig.isDisabled,defineConfig.suffixIcon)"
               :class="dynamicInpAlign()[0]">
        <text text="24 #f56c6c" pa :class="dynamicInpAlign()[1]" bottom--30 v-show="errorMessage">{{
            errorMessage
          }}
        </text>
      </view>


      <!-- 后置插槽 -->
      <slot name="suffix"/>
    </view>

    <view class="bg-[#F3F3F3]" w-640 h-1 ml-30
          v-show="dynamicShowLine(defineConfig.prop,cellData[cellData.length-1].prop)"/>
  </view>

</template>
