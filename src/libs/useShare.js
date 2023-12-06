// useShare.js
import {onShareAppMessage, onShareTimeline} from '@dcloudio/uni-app'

export const useShare = (params = {}) => {
    let defaultOptions = {
        title: 'xx',
        path: '/pages/login/index',
        ...params
    }
    // 分享朋友默认配置
    let shareAppOptions = {}
    // 分享朋友圈默认配置
    let shareTimeOptions = {}
    // onShareAppMessage
    const shareApp = (options = {}) => {
        onShareAppMessage((res) => {
            return {
                ...defaultOptions,
                ...options,
                ...shareAppOptions
            }
        })
    }
    // 添加onShareAppMessage参数
    const setShareApp = (options = {}) => {
        shareAppOptions = options
    }
    // onShareTimeline
    const shareTime = (options = {}) => {
        onShareTimeline(() => {
            return {
                ...defaultOptions,
                ...options,
                ...shareTimeOptions
            }
        })
    }
    // 添加onShareTimeline参数
    const setShareTime = (options = {}) => {
        shareTimeOptions = options
    }

    return {
        onShareAppMessage: shareApp,
        onShareTimeline: shareTime,
        setShareApp,
        setShareTime,
    }
}
