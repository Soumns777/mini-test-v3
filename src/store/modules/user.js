import {
    defineStore
} from 'pinia'

export const useUserStore = defineStore({
    state: () => ({
        Authorization: '',// 全局TOKEN
        USER_MSG: '', // 全局个人信息
    }),
    getters: {},
    actions: {
        // 登录,初始化TOKEN和用户基础信息
        initToken(Authorization, USER_MSG) {
            this.Authorization = Authorization
            this.USER_MSG = USER_MSG
        },
    },
    // persist: true, // 开启缓存
    persist: {
        key: 'User',
    },
});

