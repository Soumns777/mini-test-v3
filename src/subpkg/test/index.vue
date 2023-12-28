<script setup>
import {toast} from '@/services/promiseApi.js'
import {FORM_RULE_TYPE, INPUT_SELECT_TYPE, HTTP_RESULT} from "@/libs/constant.js";


const addressFormData = ref({
  userName: '',
  idCard: '',
  phone: '',
  address: {}, // 选择基础地址
  provinceCityDisrict: {}, // 选择省市区
  verifyCode: '', // 验证码

})
// 表单渲染到页面的数据
const shippingAddress = ref([
  {
    label: '姓名',
    prop: 'userName',
    ruleType: FORM_RULE_TYPE.USER_NAME,
  },
  // {
  //   label: '身份证',
  //   prop: 'idCard',
  //   ruleType: FORM_RULE_TYPE.ID_CARD,
  // },


  {
    label: '手机号码',
    prop: 'phone',
    ruleType: FORM_RULE_TYPE.PHONE,
    // seconds: 5,
    uniqueKey: 'test',
  },
  // {
  //   label: '地址',
  //   prop: 'address',
  //   ruleType: FORM_RULE_TYPE.ADDRESS,
  //   suffixIcon: 'arrow-right',
  //   selectType: INPUT_SELECT_TYPE.NORMAL,
  //   actions: [
  //     {
  //       name: '江苏',
  //       code:10000901
  //     },
  //     {
  //       name: '安徽',
  //       code:20920390
  //     },
  //   ]
  // },
  // {
  //   label: '省市区',
  //   prop: 'provinceCityDisrict',
  //   ruleType: FORM_RULE_TYPE.PROVINCE_CITY_DISTRICT,
  //   selectType: INPUT_SELECT_TYPE.ADDRESS,
  // },

  {
    label: '验证码',
    prop: 'verifyCode',
    ruleType: FORM_RULE_TYPE.VERIFY_CODE,
  },

])


// 多表单
const duoweiFormData = ref([
  {
    formData: JSON.parse(JSON.stringify(addressFormData.value)),
    cellData: JSON.parse(JSON.stringify(shippingAddress.value)),
  },
  // {
  //   formData: JSON.parse(JSON.stringify(addressFormData.value)),
  //   cellData: JSON.parse(JSON.stringify(shippingAddress.value)),
  // },
])


/**
 * @desc  提交
 */
const handleSubmit = async () => {
  try {
    for (let idx = 0; idx < duoweiFormData.value.length; idx++) {
      let current = duoweiFormData.value[idx]

      await refs[idx + 1].handleSubmit()

      if (idx >= duoweiFormData.value.length - 1) {
        toast('提交成功!', 2000, 'success')
        console.log("💙💛提交成功", duoweiFormData.value.map(item => item.formData))
      }
    }
  } catch (e) {
    toast(e, 2000)
  }
}

/**
 * @desc 初始化子组件ref
 */
const refs = reactive({})
const handleGetRef = (item, idx) => {
  return (el) => {
    refs[idx + 1] = toRefs(el)
  }
}


</script>

<template>
  <view class="container bg-[#f6f6f6]" min-w-h pt-40>

    <view mb-30 v-for="(item,idx) in duoweiFormData" :key="idx" px-30>
      <s1-form v-model:formData="item.formData" v-model:cellData="item.cellData"
               :ref="handleGetRef(item, idx)"
      />
    </view>


    <view f-c-c>
      <button w-600 h-100 mt-100 @click="handleSubmit" s-btn-blue>Submit</button>
    </view>


  </view>
</template>
