<!--
   * @FileDescription: custom picker template
   * @Author: Soumns
   * @Node: sPicker
   * @Date: 2023年12月13日21:31:35
-->
<script setup name="sPicker">
import {useArea} from "@/hooks/useArea";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  cellData: {
    type: Array,
    required: true,
  },
  handleValidate: {
    type: Function,
    required: true,
  },
  addressList: {
    type: Array,
    required: true,
  }
})
const {
  formData,
  cellData,
  handleValidate,
} = toRefs(props)


/**
 * @desc select picker
 */
const showPicker = ref(false)
const pickerData = ref([])
const pickerType = ref()
const pickerLoading = ref(false)
const dynamicDefaultIdx = ref([0, 0, 0])

const handleSelectPicker = (prop, actions) => {
  pickerType.value = prop
  pickerData.value = actions
  showPicker.value = !showPicker.value
}


/**
 * @desc change picker event
 */
const handleChangePicker = async (e) => {
  pickerLoading.value = true
  switch (e.columnIndex) {
      // select province
    case 0: {
      const city = await useArea(2, e.value[0].code)
      const district = await useArea(3, city[0].code)
      pickerData.value = [pickerData.value[0], city, district]
      dynamicDefaultIdx.value = [e.index, 0, 0]
      break;
    }
      // select city
    case 1: {
      const district = await useArea(3, e.value[1].code)
      pickerData.value = [pickerData.value[0], pickerData.value[1], district]
      dynamicDefaultIdx.value = [dynamicDefaultIdx.value[0], e.index, 0]
      break;
    }
      // select district
    case 2: {
      dynamicDefaultIdx.value[2] = e.index
      break;
    }
    default: {
      break;
    }
  }
  // 实时更新最新的省市区数据
  emits('update:addressList', pickerData.value)
  pickerLoading.value = false
}


/**
 * @desc confirm picker event
 */
const emits = defineEmits()
const handleConfirmPicker = async (e) => {
  showPicker.value = !showPicker.value
  let selectAddress = []
  let selectAddressCode = []

  e.value.map(item => {
    selectAddressCode.push(item.code)
    selectAddress.push(item.name)
  })
  formData.value[pickerType.value].name = selectAddress
  formData.value[pickerType.value].code = selectAddressCode

  // 实时更新最新的省市区数据
  emits('update:addressList', pickerData.value)
  // 选择完毕需要校验一下,关闭报错提示
  let idx = cellData.value.findIndex(item => item.prop == pickerType.value)
  await handleValidate.value(idx, selectAddress)
}


defineExpose({
  handleSelectPicker
})


</script>

<template>
  <!-- 省市区  -->
  <u-picker :show="showPicker" @close="showPicker = false" ref="uPickerRef" keyName="name"
            :columns="pickerData" @cancel="showPicker = !showPicker"
            @confirm="handleConfirmPicker" @change="handleChangePicker" :loading="pickerLoading"
            :defaultIndex="dynamicDefaultIdx"
            immediateChange
            closeOnClickOverlay
  />
</template>
