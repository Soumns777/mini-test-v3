<!--
   * @FileDescription: custom idcard upload
   * @Author: Soumns
   * @Node: sUploadIdcard
   * @Date: 2023年12月29日14:43:31
-->
<script setup name="sUploadIdcard">
import {BASE_URL, IMG_URL} from "@/libs/config.js";
import {UPLOAD_IDCARD_TYPE} from "@/libs/constant.js";
import useUploadFiles from "@/hooks/useUploadFiles.js";
import {toast} from "@/services/promiseApi.js";

const props = defineProps({
  uploadedFiles: {
    type: Array,
    required: true,
  },
})
const {
  uploadedFiles,
} = toRefs(props)


/**
 * @desc 上传身份证图片
 */

const {customChoose} = useUploadFiles()
const handleUploadFile = async (uploadType) => {
  try {
    let params = {
      url: BASE_URL + '/upload',
      count: 3,
      uploadType,
      formData: {
        identity: 0,
      },
      // prod Bearer 266|G51SJuT0g4NUhuLzR15lJA83rdeTtoFrDo1ebgqs7f772be0
      // test Bearer 258|CqnbbRRYaplCR6ejEVNqq6YF1hlOZg0EWHsJaPsUda32d08d
      token: "Bearer 266|G51SJuT0g4NUhuLzR15lJA83rdeTtoFrDo1ebgqs7f772be0",
      filePath: ""
    }
    const res = await customChoose(params)
    console.log("💙💛上传图片返回数据", res)

    let idx = uploadedFiles.value.findIndex(item => item.type == uploadType)
    let imgUrl = res.filter(item => item.type == uploadType)[0].imgUrl
    uploadedFiles.value[idx].idcardImg = imgUrl


  } catch (e) {
    console.log("💙💛上传图片失败", e)
    toast('上传图片失败', 2000)
  }
}
</script>

<template>
  <view f-c mt-40>
    <view w-10 h-30 class="bg-[#CF964D]" rd-show-circle mr-20/>
    <text text="34 #333333">请上传法定代表人身份证</text>
  </view>

  <view h-336 f-c j-c-b mt-20 w-all>
    <view w-335 h-all bg-base rd-sm pt-40 v-for="(item,idx) in uploadedFiles" :key="idx">
      <view f-c-c f-col>
        <view w-275 h-186 bg-all f-c-c
              :style="{backgroundImage: `url(${item.backgroundImg})`}" pr @click="handleUploadFile(item.type)">

          <view pr w-255 h-148>
            <!--  mask -->
            <view pa top-0 left-0 w-all h-all rd-idCard-img op-20 z-2 class="bg-[#474A62]"/>
            <image w-all h-all mode="aspectFill"
                   :src="item.idcardImg" rd-idCard-img/>
            <image
                w-56 h-42
                dw-center
                :src="item.uploadAgainImg"
                mode="aspectFit"
            />
          </view>

        </view>
        <text text="28 #858585" mt-30>{{ item.text }}</text>
        <text text="24 #f56c6c" v-show="item.errorMessage">请{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>
