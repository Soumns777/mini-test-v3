/**
 * @desc 配置项目请求根路径和超时时间
 */

// 请求api根路径(测试环境)
let BASE_URL;

if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'https://3924091x38.imdo.co/zhibei/public/api'
} else {
    BASE_URL = ''
}

console.log("💙💛请求api基地址", BASE_URL)


const TIME_OUT = '10000'


export {BASE_URL, TIME_OUT}
