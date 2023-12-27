<!--
   * @FileDescription: form verify code
   * @Author: Soumns
   * @Node: sVerifyCode
   * @Date: 2023年12月25日10:52:51
-->
<script setup name="sVerifyCode">
import {toast} from "@/services/promiseApi.js";

const props = defineProps({
  phoneNumber: {
    type: [String, Number],
    required: false,
  },
  seconds: {
    type: [String, Number],
    required: false,
    default: 60
  },
  uniqueKey: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
    default: '#C69859'
  },
  borderColor: {
    type: String,
    required: false,
    default: "#CF964D"
  },
})
const {
  seconds,
  uniqueKey,
  phoneNumber
} = toRefs(props)

const verifyCode = ref('')
const uCodeRef = ref(null)


/**
 * @desc send verify code
 */
const handleSendCode = () => {
  if (!uni.$u.test.mobile(phoneNumber.value)) {
    return toast('请正确输入手机号', 2000)
  }
  uCodeRef.value.start()
}


/**
 * @desc changed verify code
 */
const handleCodeChange = (text) => {
  verifyCode.value = text
}
</script>

<template>
  <button h-50 px-10 b="1 solid" b-borderColor ml-20 rd-sm f-c-c bg-base text="24" :style="{color,borderColor}"
          @tap="handleSendCode">{{
      verifyCode
    }}
  </button>

  <u-code start-text="发送验证码" change-text="Xs" :seconds="seconds"
          ref="uCodeRef"
          @change="handleCodeChange" keepRunning
          :unique-key="uniqueKey">
  </u-code>
</template>
