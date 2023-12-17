<!--
   * @FileDescription: custom action sheet template
   * @Author: Soumns
   * @Node: sActionSheet
   * @Date: 2023年12月13日17:21:36
-->
<script setup name="sActionSheet">

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
  }
})
const {
  formData,
  cellData,
  handleValidate
} = toRefs(props)

/**
 * @desc select action-sheet
 */
const showAction = ref(false)
const actionType = ref()
const actionData = ref([])
const handleSelectAction = (prop, actions) => {
  showAction.value = !showAction.value
  actionData.value = actions
  actionType.value = prop
}
const handleConfirmAction = async (e) => {
  formData.value[actionType.value].name = e.name
  formData.value[actionType.value].code = e.code
  // 选择完毕需要校验一下,关闭报错提示
  let idx = cellData.value.findIndex(item => item.prop == actionType.value)
  await handleValidate.value(idx, e.name)
}


defineExpose({
  handleSelectAction
})
</script>

<template>
  <!-- Action-Sheet -->
  <u-action-sheet :actions="actionData" :show="showAction" @select="handleConfirmAction" cancelText="取消"
                  @close="showAction = !showAction"/>
</template>
