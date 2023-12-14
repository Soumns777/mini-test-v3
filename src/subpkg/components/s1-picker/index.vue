<!--
   * @FileDescription: custom picker template
   * @Author: Soumns
   * @Node: sPicker
   * @Date: 2023年12月13日21:31:35
-->
<script setup name="sPicker">
const showPicker = ref(false)
const pickerData = ref([])
const pickerLoading = ref(false)
const dynamicDefaultIdx = ref([0, 0, 0])


/**
 * @desc select picker
 */
const handleSelectPicker = (prop, actions) => {
  console.log("💙💛select picker", actions)
  pickerData.value = actions
  showPicker.value = !showPicker.value
}

/**
 * @desc change picker event
 */
const handleChangePicker = (e) => {
  try {
    console.log("💙💛change picker", e)
  } catch (e) {

  }
}


/**
 * @desc confirm picker event
 */
const handleConfirmPicker = (e) => {
  showPicker.value = !showPicker.value
  console.log("💙💛confirm picker", e)
}

defineExpose({
  handleSelectPicker
})
</script>

<template>
  <!-- 省市区  -->
  <u-picker :show="showPicker" :closeOnClickOverlay="true" @close="showPicker = false" ref="uPickerRef" keyName="name"
            :columns="pickerData" @cancel="showPicker = !showPicker"
            @confirm="handleConfirmPicker" @change="handleChangePicker" :loading="pickerLoading"
            :defaultIndex="dynamicDefaultIdx"
            immediateChange
  />
</template>
