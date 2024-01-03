/**
 * @desc uni.showToast
 */
export const toast = function (title = '数据处理失败', duration = 2000, icon = 'none') {
    return uni.showToast({
        title, duration, icon
    })
}


/**
 * @desc uni.showLoading
 */
export const showLoading = function (title = '加载中...') {
    return uni.showLoading({
        title,
    })
}

/**
 * @desc uni.hideLoading
 */
export const hideLoading = function (title = '加载中...') {
    return uni.hideLoading()
}

/**
 * @desc uni.showModal
 */
export const showModal = function (title = '提示', content, showCancel = true) {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title, content, showCancel, success(res) {
                resolve(res.confirm)
            }, fail(err) {
                reject(err.confirm)
            }
        })
    })
}


/**
 * @desc 选择图片
 */
export const chooseImage = (type = ['album', 'camera',], count = 1) => {
    return new Promise((resolve, reject) => {
        uni.chooseMedia({
            sourceType: type, // 来源:相机/图库
            count, success(res) {
                resolve(res)
            }, fail(err) {
                reject(err)
            }
        })
    })
}

/**
 * @desc 图片上传
 */
export const uploadImage = (params) => {
    showLoading('上传中...')
    const {
        url, token, filePath, formData
    } = params
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url, header: {
                "Authorization": token
            }, formData, name: 'file', filePath, success: (fileData) => {
                hideLoading()
                resolve(fileData)
            }, fail: (err) => {
                hideLoading()
                reject(err)
            },
        })
    })
}

/**
 * @desc 预览图片
 */
export const previewImage = (fileList) => {
    return new Promise((resolve, reject) => {
        uni.previewImage({
            urls: fileList, // 来源:相机/图库
            success(res) {
                resolve(res)
            }, fail(err) {
                reject(err)
            }
        })
    })
}

/**
 * @desc 小程序登录 uni.login --> 获取临时code
 */
export const getLogin = () => {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: 'weixin', success(res) {
                resolve(res)
            }, fail(err) {
                reject(err)
            }
        })
    })
}

/**
 * @desc 小程序订阅消息 getSetting 获取用户设置
 */
export const getSetting = () => {
    uni.showLoading({
        title: '加载中..'
    })
    return new Promise((resolve, reject) => {
        uni.getSetting({
            withSubscriptions: true, success(res) {
                uni.hideLoading();
                resolve(res)
            }, fail(err) {
                uni.hideLoading();
                uni.showToast({
                    title: '加载失败', icon: 'error'
                });
                reject(err)
            }
        })
    })
}


/**
 * @desc 小程序订阅消息 openSetting 修改用户设置
 */
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        uni.openSetting({
            withSubscriptions: true, success(res) {
                resolve(res)
            }, fail(err) {
                reject(err)
            }
        })
    })
}


/**
 * @desc 小程序订阅消息 发送订阅消息
 * @param tmplId 小程序订阅消息模版id
 */
export const sendSubscribeMessage = (tmplId) => {
    return new Promise((resolve, reject) => {
        uni.requestSubscribeMessage({
            tmplIds: [tmplId], success(res) {
                resolve(res[tmplId])
            }, fail(err) {
                reject(err[tmplId])
            }
        })
    })
}

