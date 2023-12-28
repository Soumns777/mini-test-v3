<!--
   * @FileDescription: custom form template
   * @Author: Soumns
   * @Node: sForm
   * @Date: 2023年12月12日15:33:07
-->
<script setup name="sForm">
import {toast} from "@/services/promiseApi.js";
import {INPUT_SELECT_TYPE} from "@/libs/constant.js";
import {useProvinceCityDistrict} from "@/hooks/useArea";

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
 * @desc dynamic inpVal
 */
const dynamicInpVal = computed(() => {
  return (formItem) => {
    if (formItem.selectType) {
      return formData.value[formItem.prop].name
    } else {
      return formData.value[formItem.prop]
    }
  }
})

/**
 * @desc dynamic suffix icon
 */
const dynamicSuffixIcon = computed(() => {
  return (formItem) => {
    if (formItem.suffixIcon) {
      return formItem.suffixIcon
    } else {
      return 'arrow-right'
    }
  }
})

/**
 * @desc 初始化省市区所有数据
 */
let addressList = ref([])
/**
 * @desc update province city district
 */
const handleUpdateAddress = (provinceCityDistrict) => {
  addressList.value = provinceCityDistrict
}
onLoad(async () => {
  // addressList.value = await useProvinceCityDistrict()
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
      pickerRef.value.handleSelectPicker(prop, addressList.value)
      break;
    }
    default: {
      actionSheetRef.value.handleSelectAction(prop, actions)
      break;
    }
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
        let dynamicInpVal = current.selectType ? formData.value[current.prop].name : formData.value[current.prop]
        try {
          await refs[idx + 1].handleVerify(dynamicInpVal)
        } catch (e) {
          return reject(e)
        }

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
  handleSubmit,
  addressList
})


</script>

<template>
  <!--  form组件 -->
  <view bg-base rd-sm>
    <s1-form-item v-for="(item,idx) in cellData"
                  :inpVal="dynamicInpVal(item)"
                  :defineConfig="item"
                  v-model:formData="formData"
                  :cellData="cellData"
                  :ref="handleGetRef(item, idx)"
                  :inputAlign="inputAlign"
                  :labelWidth="labelWidth"
                  :key="idx">

      <template #suffix pr>
        <view pa right-0 top--20 w-500 h-70 op-0 z-2 @click="handleSelect(item.selectType,item.prop,item.actions)"
              v-if="item.selectType"/>
        <u-icon :name="dynamicSuffixIcon(item)" size="17" color="#B4B4B5" v-if="item.selectType"/>

        <!-- verify code -->
        <s1-verify-code :phoneNumber="dynamicInpVal(item)" :borderColor="item.borderColor" :color="item.color"
                        :seconds="item.seconds"
                        :uniqueKey="item.uniqueKey" v-if="item.uniqueKey"/>
      </template>
    </s1-form-item>
  </view>

  <view h-336 f-c j-c-b mt-20 w-all>
    <view w-335 h-all bg-base rd-sm pt-59>
      <view w-275 h-186/>

    </view>
    <view w-335 h-all bg-base rd-sm>22</view>
  </view>

  <!-- action-sheet -->
  <s1-action-sheet v-model:handleValidate="handleValidate" v-model:formData="formData" v-model:cellData="cellData"
                   ref="actionSheetRef"/>

  <!-- picker(选择省市区) -->
  <s1-picker v-model:handleValidate="handleValidate" v-model:formData="formData" v-model:cellData="cellData"
             v-model:addressList="addressList" ref="pickerRef"/>


</template>
