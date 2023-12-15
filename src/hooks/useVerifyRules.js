/**
 * @desc form-verify
 */
import {FORM_RULE_TYPE} from "@/libs/constant.js";

export const useVerify = (prop) => {
    switch (prop) {
        case FORM_RULE_TYPE.USER_NAME: {
            return [
                {
                    required: true,
                    message: '请输入姓名',
                },
                {
                    validator: (value) => {
                        return uni.$u.test.chinese(value);
                    },
                    message: '姓名格式不正确',
                },
            ]
        }
        case FORM_RULE_TYPE.ID_CARD: {
            return [
                {
                    required: true,
                    message: '请输入身份证',
                },
                {
                    validator: (value) => {
                        return uni.$u.test.idCard(value);
                    },
                    message: '身份证格式不正确',
                },
            ]
        }
        case FORM_RULE_TYPE.PHONE: {
            return [
                {
                    required: true,
                    message: '请输入手机号',
                },
                {
                    validator: (value) => {
                        return uni.$u.test.mobile(value);
                    },
                    message: '手机号格式不正确',
                },
            ]
        }
        case FORM_RULE_TYPE.ADDRESS: {
            return [
                {
                    required: true,
                    message: '请选择地址',
                },
            ]
        }
        case FORM_RULE_TYPE.PROVINCE_CITY_DISTRICT: {
            return [
                {
                    required: true,
                    message: '请选择省市区',
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
        default: {
            return 'text'
        }
    }
}
