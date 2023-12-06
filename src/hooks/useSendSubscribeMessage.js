/**
 * @desc 小程序订阅消息hook
 * @author Soumns
 * @date 2023年08月17日15:54:46
 */

import {
    openSetting, getSetting, sendSubscribeMessage
} from '../services/request.js'
import {
    showModal, toast
} from './toast.js'

export default function useSendSubscribeMessage() {
    let templateId = ''
    /**
     * @desc 微信小程序订阅消息
     */
    const subscribeNews = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                templateId = id

                const {
                    subscriptionsSetting
                } = await getSetting()

                if (subscriptionsSetting.mainSwitch) {
                    // 首次进入
                    if (!subscriptionsSetting[templateId]) {
                        // Soumns 发送订阅消息
                        return handleSendSubscribeMessage(false, resolve)
                    } else {

                        if (subscriptionsSetting.itemSettings[templateId] == 'accept') {
                            // Soumns 发送订阅消息(直接调用后台接口,不用重新进行申请权限)
                            return handleSendSubscribeMessage(false, resolve)
                        }

                        if (subscriptionsSetting[templateId] == 'reject') {
                            // 用户不选择接收消息,需要手动打开
                            return handleUpdateSetting(resolve)
                        }

                        // Soumns 发送订阅消息
                        handleSendSubscribeMessage(false, resolve)
                    }
                } else {
                    // 用户关闭了所有订阅消息(需要手动打开)
                    handleUpdateSetting(resolve)
                }
            } catch (e) {
                return resolve(false)
            }
        })

    }

    /**
     * @desc 获取订阅消息权限
     */
    const handleSendSubscribeMessage = async (alawaysStatus = false, resolve) => {

        if (!alawaysStatus) {
            const res = await sendSubscribeMessage(templateId)
            if (res == 'reject') {
                // 用户点击取消订阅消息
                return handleUpdateSetting(resolve)

            }
            // 调用后台接口
            return resolve(true)
        }

        // toast('总是允许订阅消息!', 2000, 'success')
        // 调用后台订阅消息接口
        resolve(true)
    }

    /**
     * @desc 用户手动修改订阅消息权限
     */
    const handleUpdateSetting = async (resolve) => {
        try {
            const res = await showModal('提醒', '检测到您没有开启订阅消息的权限，是否去设置？')
            if (res) {
                // 打开权限设置
                const res1 = await openSetting()

                if (res1.subscriptionsSetting.itemSettings) {
                    if (res1.subscriptionsSetting.itemSettings[templateId] == 'reject') {
                        toast('后续如果需要订阅消息请到设置-订阅消息中手动打开推送权限', 2000)
                        // 调用后台接口
                        return resolve(false)
                    } else if (res1.subscriptionsSetting.itemSettings[templateId] == 'accept') {
                        // 调用后台接口
                        return resolve(false)
                    }
                }

                const {
                    subscriptionsSetting
                } = await getSetting()
                if (subscriptionsSetting.mainSwitch) {
                    const res2 = await showModal('提醒', '开启订阅消息')
                    if (res2) {
                        const res3 = await sendSubscribeMessage(templateId)
                        if (res3 == 'accept') {
                            return resolve(true)
                        } else {
                            toast('后续如果需要订阅消息请到设置-订阅消息中手动打开推送权限', 2000)
                            return resolve(false)
                        }
                    } else {
                        toast('后续如果需要订阅消息请到设置-订阅消息中手动打开推送权限', 2000)
                        // 调用后台接口
                        return resolve(false)
                    }
                }
            } else {
                // 直接调用后台接口
                toast('后续如果需要订阅消息请到设置-订阅消息中手动打开推送权限', 2000)
                resolve(false)
            }
        } catch (e) {
            return resolve(false)
        }
    }

    return {
        subscribeNews
    }
}
