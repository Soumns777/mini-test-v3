/**
 * @desc form-verify
 */
import {FORM_RULE_TYPE, HTTP_RESULT} from "@/libs/constant.js";
import {codeVerify} from "@/services/request.js";
import {toast} from "@/services/promiseApi.js";

export const useVerify = (prop) => {
    switch (prop) {
        case FORM_RULE_TYPE.USER_NAME: {
            return [{
                required: true, message: '请输入姓名',
            }, {
                validator: (value) => {
                    return uni.$u.test.chinese(value);
                }, message: '姓名格式不正确',
            },]
        }
        case FORM_RULE_TYPE.ID_CARD: {
            return [{
                required: true, message: '请输入身份证',
            }, {
                validator: (value) => {
                    return uni.$u.test.idCard(value);
                }, message: '身份证格式不正确',
            },]
        }
        case FORM_RULE_TYPE.PHONE: {
            return [{
                required: true, message: '请输入手机号',
            }, {
                validator: (value) => {
                    return uni.$u.test.mobile(value);
                }, message: '手机号格式不正确',
            },]
        }
        case FORM_RULE_TYPE.ADDRESS: {
            return [{
                required: true, message: '请选择地址',
            },]
        }
        case FORM_RULE_TYPE.PROVINCE_CITY_DISTRICT: {
            return [{
                required: true, message: '请选择省市区',
            },]
        }
        case FORM_RULE_TYPE.VERIFY_CODE: {
            return [{
                required: true, message: '请输入验证码',
            }, {
                validator: (value) => {
                    return uni.$u.test.code(value);
                }, message: '验证码格式不正确',
            }, {
                async: true, // 异步校验
                validator: (value) => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            resolve(await useVerifyCode(value))
                        } catch (e) {
                            resolve(false)
                        }
                    })
                }, message: '验证码不正确',
            }]
        }
        case FORM_RULE_TYPE.UPLOAD_FILE: {
            return [
                {
                    validator: (value) => {
                        console.log("💙💛value", value)
                    },
                    message: '请正确上传身份证',
                },
            ]
        }

        default: {
            break;
        }
    }
}


/**
 * @desc input-auto-type
 */
export const autoType = (prop) => {
    switch (prop) {
        case FORM_RULE_TYPE.USER_NAME: {
            return 'text'
        }
        case FORM_RULE_TYPE.ID_CARD: {
            return 'idcard'
        }
        case FORM_RULE_TYPE.PHONE: {
            return 'number'
        }
        case FORM_RULE_TYPE.VERIFY_CODE: {
            return 'number'
        }
        default: {
            return 'text'
        }
    }
}


/**
 * @desc code-verify
 * @param code 验证码
 */
export const useVerifyCode = (code) => {
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                code
            };
            const {
                data: {RESULT_DATA, RESULT_CODE, RESULT_MSG},
            } = await codeVerify(params);

            if (RESULT_CODE != HTTP_RESULT.SUCCESS) {
                return reject(RESULT_MSG)
            }
            resolve(RESULT_DATA)
        } catch (e) {
            reject(e)
        }
    })
}
