<!--
   * @FileDescription: form verify code
   * @Author: Soumns
   * @Node: sVerifyCode
   * @Date: 2023年12月25日10:52:51
-->
<script setup name="sVerifyCode">
const props = defineProps({
  seconds: {
    type: [String, Number],
    required: false,
    default: 60
  },
  uniqueKey: {
    type: String,
    required: false,
  },
})
const {
  seconds,
  uniqueKey
} = toRefs(props)

const verifyCode = ref('')
const uCodeRef = ref(null)


/**
 * @desc send verify code
 */
const handleSendCode = () => {
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
  <button min-w-0 h-50 px-10 b="1 solid red" ml-20 rd-sm f-c-c bg-base text="24 verifyCode" @tap="handleSendCode">{{
      verifyCode
    }}
  </button>

  <u-code start-text="发送验证码" change-text="Xs" :seconds="seconds"
          ref="uCodeRef"
          @change="handleCodeChange" keepRunning
          :unique-key="uniqueKey">
  </u-code>
</template>
