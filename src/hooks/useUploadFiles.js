/**
 * @desc 小程序图片上传hook
 * @author Soumns
 * @date 2023年08月19日11:54:46
 */
import {toast, chooseImage, hideLoading, showLoading, uploadImage} from "@/services/promiseApi.js";
import {HTTP_RESULT} from "@/libs/constant.js";

export default function useUploadFiles() {
    // 选择图片
    const customChoose = (params) => {
        let count = params.count ? params.count : 1;
        let type = params.type ? params.type : ['album', 'camera'];
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    tempFiles
                } = await chooseImage(type, count)
                let uploadedFiles = []
                // 多张上传
                for (let idx = 0; idx <= tempFiles.length; idx++) {
                    try {
                        const current = tempFiles[idx]
                        const res = await upload(params, current.tempFilePath)

                        uploadedFiles.unshift(res)
                        if (idx >= tempFiles.length - 1) {
                            resolve(uploadedFiles)
                        }
                    } catch (e) {
                        return reject(e)
                    }
                }
            } catch (e) {
                reject(e)
            }
        })
    }


    /**
     * @desc 上传单张图片
     */
    const upload = (params, filePath) => {
        return new Promise(async (resolve, reject) => {
            try {
                params.filePath = filePath
                console.log("💙💛上传单张照片请求参数", params)
                const {data: res} = await uploadImage(params)
                let {
                    code: RESULT_CODE,
                    message: RESULT_MSG,
                    data: RESULT_DATA
                } = JSON.parse(res)
                if (RESULT_CODE != HTTP_RESULT.SUCCESS) {
                    return reject(RESULT_MSG)
                }
                resolve({
                    imgId: RESULT_DATA.id,
                    imgUrl: RESULT_DATA.url,
                    type: params.uploadType
                })
            } catch (e) {
                reject(e)
            }
        })
    }


    return {
        customChoose
    }
}
