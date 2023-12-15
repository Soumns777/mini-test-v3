import $http from '@/libs/http.js'


/**
 * @desc 用户登录
 * @param account {string} 用户名
 * @param password {string} 密码
 */

export const handleLogin = (params) => {
    return $http.post('/login', params)
}


/**
 * @desc 获取我的区域
 * @param level {string} 级别，默认1,1代表省，2代表市，3代表区县
 * @param pid {string} 父级地区的code，比如取合肥市的区县，此参数的值是340100，即合肥市的code
 */

export const areas = (params) => {
    return $http.get('/areas', params)
}
































