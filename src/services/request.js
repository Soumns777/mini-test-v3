import $http from '@/libs/http.js'


/**
 * @desc 用户登录
 * @param account {string} 用户名
 * @param password {string} 密码
 */

export const handleLogin = (params) => {
    return $http.post('/login', params)
}






































