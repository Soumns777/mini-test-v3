import {
    createSSRApp
} from "vue";
import App from "./App.vue";
import {setupStore} from '@/store';
import uviewPlus from 'uview-plus'
import 'uno.css'

export function createApp() {
    const app = createSSRApp(App);
    setupStore(app);
    app.use(uviewPlus)
    return {
        app,
    };
}
