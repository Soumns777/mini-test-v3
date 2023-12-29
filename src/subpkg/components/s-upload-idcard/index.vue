<!--
   * @FileDescription: custom idcard upload
   * @Author: Soumns
   * @Node: sUploadIdcard
   * @Date: 2023年12月29日14:43:31
-->
<script setup name="sUploadIdcard">
import {IMG_URL} from "@/libs/config.js";
import {UPLOAD_IDCARD_TYPE} from "@/libs/constant.js";


// 身份证正反面
const IDNUMBER__FRONT_BACK = ref([
  {
    id: 1,
    type: UPLOAD_IDCARD_TYPE.RENXIANG,
    backgroundImg: IMG_URL + 'rongezu_upload_srxm_border.jpg',
    idcardImg: IMG_URL + 'rongezu_upload_renxiangmian.png',
    uploadAgainImg: IMG_URL + 'rongezu_uploader.png',
    text: '拍摄身份证人像面'
  },
  {
    id: 2,
    type: UPLOAD_IDCARD_TYPE.GUOHUI,
    backgroundImg: IMG_URL + 'rongezu_upload_srxm_border.jpg',
    idcardImg: IMG_URL + 'rongezu_upload_guohuimian.png',
    uploadAgainImg: IMG_URL + 'rongezu_uploader.png',
    text: '拍摄身份证国徽面'
  },
])

</script>

<template>
  <view f-c mt-40>
    <view w-10 h-30 class="bg-[#CF964D]" rd-show-circle mr-20/>
    <text text="34 #333333">请上传法定代表人身份证</text>
  </view>

  <view h-336 f-c j-c-b mt-20 w-all>
    <view w-335 h-all bg-base rd-sm pt-40 v-for="(item,idx) in IDNUMBER__FRONT_BACK" :key="idx">
      <view f-c-c f-col>
        <view w-275 h-186 bg-all f-c-c
              :style="{backgroundImage: `url(${item.backgroundImg})`}" pr>
          <image w-255 h-148 mode="aspectFill" rd-idCard-img class="bg-[#DADBDF]"
                 :src="item.idcardImg"/>
          <image
              w-56 h-42
              dw-center
              :src="item.uploadAgainImg"
              mode="aspectFit"
          />
        </view>
        <text text="28 #858585" mt-30>{{ item.text}}</text>
      </view>
    </view>
  </view>
</template>
