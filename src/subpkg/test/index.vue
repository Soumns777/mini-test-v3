<script setup>
const addressFormData = ref({
  userName: '',
  idCard: '',
  phone: ''
})
// 表单渲染到页面的数据
const shippingAddress = ref([
  {
    label: '姓名',
    value: '',
    placeholder: '请输入姓名',
    prop: 'userName'
  },
  {
    label: '身份证',
    value: '',
    placeholder: '请输入身份证',
    prop: 'idCard',
    type: 'idCard',
  },
  {
    label: '手机号码',
    value: '',
    placeholder: '请输入手机号码',
    prop: 'phone',
    type: 'number',
    isShowLine: false
  },
])
// 表单校验项
const shippingAddressRules = reactive({
  userName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: ['blur', 'change'],
    },
    {
      validator: (rule, value, callback) => {
        return uni.$u.test.chinese(value);
      },
      message: '姓名格式不正确',
      trigger: ['blur', 'change']
    },
  ],
  idCard: [
    {
      required: true,
      message: '请输入身份证',
      trigger: ['blur', 'change'],
    },
    {
      validator: (rule, value, callback) => {
        return uni.$u.test.idCard(value);
      },
      message: '身份证格式不正确',
      trigger: ['blur', 'change']
    },
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: ['blur', 'change'],
    },
    {
      validator: (rule, value, callback) => {
        return uni.$u.test.mobile(value);
      },
      message: '手机号码格式不正确',
      trigger: ['blur', 'change']
    },
  ],
})


</script>

<template>
  <view class="container bg-[#f6f6f6]" min-w-h>

    <view mt-30 px-30rpx rd-sm bg-base w-696 h-400 ml-28 pt-30 pb-20>
      <s1-up-form v-model:formData="addressFormData" v-model:cellData="shippingAddress"
                  v-model:formRules="shippingAddressRules" inputAlign="left" ref="addressFormRef"
      />
    </view>
  </view>
</template>
