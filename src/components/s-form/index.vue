<!--
   * @FileDescription: 二次封装uview-plus form组件
   * @Author: Soumns
   * @Node: sUForm
   * @Date: 2023年11月30日11:01:12
-->
<script setup name="sUForm">
import './index.scss'
// 表单接收formData
const props = defineProps({
  formData: {
    type: Object,
    required: true,
    default: {}
  }, // 父组件的表单数据
  cellData: {
    type: Array,
    required: true,
    default: []
  }, // 子组件的表单渲染数据
  formRules: {
    type: Object,
    required: true,
    default: {}
  }, // 表单校验项
  inputAlign: {
    type: String,
    required: false,
    default: 'right'
  },
  handleVerify: {
    type: Function,
    required: false,
    default: () => {
    }
  },
})

const {
  formData,
  cellData,
  formRules,
  inputAlign,
} = toRefs(props)


// 是否展示line
const dynamicShowLine = computed(() => {
  return isShowLine => {
    return isShowLine == undefined ? true : isShowLine
  }
})


/**
 * @desc 提交校验表单
 */
const handleVerifyForm = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await formRef.value.validate()
      resolve()
    } catch (e) {
      console.log("💙💛提交校验表单失败", e)
      reject(e[0].message)
    }
  })
}

// 设置form-rules
const formRef = ref(null)
onBeforeMount(() => {
  formRef.value.setRules(formRules.value)
})

defineExpose({
  handleVerifyForm,
  handleDefaultColumnIdx
})

const emits = defineEmits()
emits('update:handleVerify', handleVerifyForm)


</script>

<template>
  <u-form ref="formRef" :model="formData" :rules="formRules">
    <view v-for="(item,idx) in cellData" :key="idx">
      <u-form-item :labelWidth="item.labelWidth || 80" :label="item.label"
                   :prop="item.prop"
                   required @click="handleSelect(item)">
        <u--input
            v-model="formData[item.prop]"
            :placeholder="item.placeholder"
            border="none"
            inputAlign="left"
            disabledColor="#fff"
            :type="item.type || 'text'"
            :disabled="item.isNeedSelect"
        />
        <template #right>
          <u-icon v-if="item.isNeedSelect" name="arrow-right" size="17" color="#B4B4B5"/>
        </template>
      </u-form-item>

      <view mt-27 w-639 mb-25 h-2 class="bg-[#EFEFEF]" v-if="dynamicShowLine(item.isShowLine)"/>
    </view>
  </u-form>
</template>



