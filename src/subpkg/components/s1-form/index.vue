<!--
   * @FileDescription: custom form template
   * @Author: Soumns
   * @Node: sForm
   * @Date: 2023年12月12日15:33:07
-->
<script setup name="sForm">
import {toast} from "@/services/promiseApi.js";
import {INPUT_SELECT_TYPE} from "@/libs/constant.js";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  }, // 表单数据源
  cellData: {
    type: Array,
    required: true,
  }, // 表单页面渲染源
  inputAlign: {
    type: String,
    required: false,
  }, // input对齐方式
  labelWidth: {
    type: [Number, String],
    required: false,
  } // input左侧label宽度
})
const {
  formData,
  cellData,
} = toRefs(props)

/**
 * @desc 初始化子组件ref
 */
const refs = reactive({})
const handleGetRef = (item, idx) => {
  return (el) => {
    refs[idx + 1] = toRefs(el)
  }
}

/**
 * @desc 提交表单校验
 */

// 校验表单某个字段
const handleValidate = async (idx, val) => {
  await refs[idx + 1].handleVerify(val)
}

const handleSubmit = () => {
  return new Promise(async (resolve, reject) => {
    for (let idx = 0; idx < cellData.value.length; idx++) {
      try {
        let current = cellData.value[idx]
        await refs[idx + 1].handleVerify(formData.value[current.prop])
        if (idx >= cellData.value.length - 1) {
          resolve()
        }
      } catch (e) {
        reject(e)
      }
    }
  })
}

defineExpose({
  handleSubmit
})


/**
 * @desc select content
 */
const actionSheetRef = ref()
const pickerRef = ref()
const handleSelect = (selectType, prop, actions) => {
  switch (selectType) {
    case INPUT_SELECT_TYPE.NORMAL: {
      actionSheetRef.value.handleSelectAction(prop, actions)
      break;
    }
    case INPUT_SELECT_TYPE.ADDRESS: {
      pickerRef.value.handleSelectPicker(prop, actions)
      break;
    }
    default: {
      actionSheetRef.value.handleSelectAction(prop, actions)
      break;
    }
  }
}

</script>

<template>
  <!--  form组件 -->
  <view bg-base rd-sm>
    <s1-form-item v-for="(item,idx) in cellData"
                  v-model:inpVal="formData[item.prop]"
                  :defineConfig="item"
                  :cellData="cellData"
                  :ref="handleGetRef(item, idx)"
                  :inputAlign="inputAlign"
                  :labelWidth="labelWidth"
                  :key="idx">

      <template #suffix pr v-if="item.suffixIcon">
        <view pa right-0 top--20 w-500 h-70 op-0 z-2 @click="handleSelect(item.selectType,item.prop,item.actions)"/>
        <u-icon :name="item.suffixIcon" size="17" color="#B4B4B5"/>
      </template>
    </s1-form-item>
  </view>

  <!-- action-sheet -->
  <s1-action-sheet v-model:handleValidate="handleValidate" v-model:formData="formData" v-model:cellData="cellData"
                   ref="actionSheetRef"/>

  <!-- picker(选择省市区) -->
  <s1-picker ref="pickerRef"/>
</template>
