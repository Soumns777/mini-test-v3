/**
 * @desc 请求类封装
 */
import {BASE_URL, TIME_OUT} from './config'
import {storeToRefs} from 'pinia'
import {
    useUserStore
} from '@/store/modules/user.js';

// 获取token
const {Authorization} = storeToRefs(useUserStore())


class Request {
    constructor(options = {}) {
        // 请求的根路径
        this.baseUrl = BASE_URL || ''
        // 超时时间
        this.timeout = TIME_OUT || '60000'
        // 请求的 url 地址
        this.url = options.url || ''
        // 请求方式
        this.method = 'GET'

        // 请求的参数对象
        this.data = null
        // header 请求头
        this.header = options.header || {}
        this.beforeRequest = null
        this.afterRequest = null
    }

    get(url, data = {}) {
        this.method = 'GET'
        this.url = this.baseUrl + url
        this.data = data
        return this._()
    }

    post(url, data = {}) {
        this.method = 'POST'
        this.url = this.baseUrl + url
        this.data = data
        return this._()
    }

    put(url, data = {}) {
        this.method = 'PUT'
        this.url = this.baseUrl + url
        this.data = data
        return this._()
    }

    delete(url, data = {}) {
        this.method = 'DELETE'
        this.url = this.baseUrl + url
        this.data = data
        return this._()
    }

    _() {
        // 清空 header 对象
        this.header = {}
        // 请求之前做一些事
        this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this)
        // 全局添加请求token
        if (Authorization) {
            this.header['Authorization'] = Authorization.value
        }


        uni.showLoading({
            title: '加载中...'
        })
        // 发起请求
        return new Promise((resolve, reject) => {
            let weixin = wx
            // 适配 uniapp
            if ('undefined' !== typeof uni) {
                weixin = uni
            }
            weixin.request({
                url: this.url, method: this.method, data: this.data, header: this.header, success: (res) => {
                    resolve(res)
                }, fail: (err) => {
                    reject(err)
                }, complete: (res) => {
                    // 请求完成以后做一些事情
                    this.afterRequest && typeof this.afterRequest === 'function' && this.afterRequest(res)


                    uni.hideLoading()
                }
            })
        })
    }
}

export default new Request()
