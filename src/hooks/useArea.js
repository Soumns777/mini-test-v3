/**
 * @desc 初始化省市区区域数据
 */
import {areas} from "@/services/request.js";
import {HTTP_RESULT} from "@/libs/constant.js";

/**
 * @desc 根据层级和区域code初始化某一层级数据
 * @param level 级别，默认1,1代表省，2代表
 * 市，3代表区县
 * @param pid 父级地区的code，比如取合肥市的区县，此参数的值是340100，即合肥市的code
 */
const useArea = (level, pid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = pid ? {level, pid} : {level}
            const {
                data: {
                    code: RESULT_CODE,
                    data: RESULT_DATA,
                    message: RESULT_MSG
                }
            } = await areas(params);
            if (RESULT_CODE != HTTP_RESULT.SUCCESS) {
                return reject(RESULT_MSG)
            }
            resolve(RESULT_DATA)
        } catch (e) {
            reject(e)
        }
    })
}

/**
 * @desc 初始化省市区基础数据
 */
const useProvinceCityDistrict = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const province = await useArea(1)
            const city = await useArea(2, province[0].code)
            const district = await useArea(3, city[0].code)
            resolve([province, city, district])
        } catch (e) {
            reject(e)
        }
    })
}

export {
    useArea,
    useProvinceCityDistrict
}
