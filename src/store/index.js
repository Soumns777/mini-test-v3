import {
    createPinia
} from 'pinia';
import {createPersistedState} from 'pinia-plugin-persistedstate'

const pinia = createPinia();
// 将插件添加到 pinia 实例上，全局配置持久化的storage
pinia.use(createPersistedState({
    storage: {
        getItem: (key) => {
            return uni.getStorageSync(key);
        }, setItem: (key, value) => {
            uni.setStorageSync(key, value);
        }
    },
}));

// pinia.use(piniaPluginPersistedstate)

export function setupStore(app) {
    app.use(pinia);
}

export {
    pinia
};
