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
  handleArea: {
    type: Function,
    required: false,
    default: () => {
    }
  }
})

const {
  formData,
  cellData,
  formRules,
  inputAlign,
} = toRefs(props)

// 设置form-rules
const formRef = ref()
const handleInitRules = (formRules) => {
  formRef.value.setRules(formRules)
}
onBeforeMount(() => {
  handleInitRules(formRules.value)
})

// 是否展示line
const dynamicShowLine = computed(() => {
  return isShowLine => {
    return isShowLine == undefined ? true : isShowLine
  }
})

/**
 * @desc 选择下拉项
 */
const showActionSheet = ref(false)
const dynamicSelectType = ref() // 选择框类型,用于更新formData
const dropDownData = ref([])

const showPicker = ref(false)
const dropLoading = ref(false) // 选择下拉时的加载状态
const uPickerRef = ref(null)
const dynamicDefaultIdx = ref([0, 0, 0])
const handleSelect = async (formItem) => {
  if (!formItem.isNeedSelect) {
    return
  }
  dropDownData.value = formItem.columns
  dynamicSelectType.value = formItem.prop

  if (formItem.selectType == 'actionSheet') {
    showActionSheet.value = true
  } else if (formItem.selectType == 'picker') {
    showPicker.value = true
  }
}

// 选择action-sheet
const handleConfirmSelect = (e) => {
  formData.value[dynamicSelectType.value] = e.name
  // 选择完毕需要校验一下,关闭报错提示
  formRef.value.validateField(dynamicSelectType.value)
}

// 一开始的设置columns数据(后续应该用不上)
const handleDefaultColumnIdx = async (level, columnData) => {
  uPickerRef.value.setColumnValues(level, columnData)
}

// 变更picker
const handleChangePicker = async (e) => {
  if (e.columnIndex < 2) {
    dropLoading.value = true
    if (e.columnIndex == 0) {
      dynamicDefaultIdx.value = [e.index, 0, 0]
      const res = await props.handleArea(e.columnIndex + 2, e.value[e.columnIndex].code)
      await props.handleArea(e.columnIndex + 3, res)
    } else {
      dynamicDefaultIdx.value = [dynamicDefaultIdx.value[0], e.index, 0]
      await props.handleArea(3, e.value[e.columnIndex].code)
    }
    dropLoading.value = false
  }
}

/**
 * @desc 确认选择picker(省市区)
 */
const handleConfirmPicker = (e) => {
  let dropPickerText = []
  formData.value.areaCodes = []
  e.value.map(item => {
    formData.value.areaCodes.push(item.code)
    dropPickerText.push(item.name)
  })
  showPicker.value = !showPicker.value
  formData.value[dynamicSelectType.value] = dropPickerText.join('-')
  // 选择完毕需要校验一下,关闭报错提示
  formRef.value.validateField(dynamicSelectType.value)
  console.log("💙💛选择省市区", formData.value.areaCodes, formData.value[dynamicSelectType.value]
  )
}

/**
 * @desc 提交校验表单
 */
const handleVerifyForm = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await formRef.value.validate()
      resolve()
    } catch (e) {
      reject(e[0].message)
    }
  })
}

defineExpose({
  handleVerifyForm,
  handleDefaultColumnIdx
})


onMounted(() => {
  console.log("💙💛初始化表单数据", formData.value, cellData.value)
})


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

  <!-- Action-Sheet -->
  <u-action-sheet :actions="dropDownData" :show="showActionSheet" @select="handleConfirmSelect" cancelText="取消"
                  @close="showActionSheet = !showActionSheet"/>

  <!-- 省市区  -->
  <u-picker :show="showPicker" :closeOnClickOverlay="true" @close="showPicker = false" ref="uPickerRef" keyName="name"
            :columns="dropDownData" @cancel="showPicker = !showPicker"
            @confirm="handleConfirmPicker" @change="handleChangePicker" :loading="dropLoading"
            :defaultIndex="dynamicDefaultIdx"
  />


</template>



