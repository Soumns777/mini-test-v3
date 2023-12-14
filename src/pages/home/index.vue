<script setup>
import {toast} from "@/services/promiseApi.js";

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
const shippingAddressRules = ref({
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


const duoweiFormData = ref([])


duoweiFormData.value = [
  {
    formData: JSON.parse(JSON.stringify(addressFormData.value)),
    cellData: JSON.parse(JSON.stringify(shippingAddress.value)),
    rules: JSON.parse(JSON.stringify(shippingAddressRules.value)),
    handleVerify: () => {
    }
  },
  {
    formData: JSON.parse(JSON.stringify(addressFormData.value)),
    cellData: JSON.parse(JSON.stringify(shippingAddress.value)),
    rules: JSON.parse(JSON.stringify(shippingAddressRules.value)),
    handleVerify: () => {
    }
  },
]


/**
 * @desc 校验
 */

const handleSubmit = async () => {
  try {
    for (let idx = 0; idx <= duoweiFormData.value.length; idx++) {
      const current = duoweiFormData.value[idx]
      await current.handleVerify()

      if (idx >= duoweiFormData.value.length - 1) {
        console.log("💙💛校验成功")
      }
    }
  } catch (e) {
    console.log("💙💛校验失败", e)
    toast(e, 2000)
  }
}


</script>

<template>
  <view class="container bg-[#f6f6f6]" min-ww-h>
    <view px-30rpx rd-sm bg-base w-696 ml-28 v-for="(item,idx) in duoweiFormData" :key="idx" mb-20>
      <s-up-form v-model:formData="item.formData" v-model:cellData="item.cellData"
                 v-model:formRules="item.rules" v-model:handleVerify="item.handleVerify" inputAlign="left"
      />
    </view>


    <button mt-40 @click="handleSubmit">提交</button>

  </view>
</template>
