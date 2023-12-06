import {defineConfig} from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite'

const pathSrc = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/


// @ts-ignore
export default defineConfig({
    transpileDependencies: ['uview-plus'],
    plugins: [
        uni(),
        // https://github.com/antfu/unocss
        Unocss(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
            ],
            imports: [
                'vue',
                'uni-app',
            ],
            dts: 'src/types/auto-imports.d.ts',
        }),
        Components({
            extensions: ['vue'],
            dts: 'src/types/components.d.ts'
        }),
    ],
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },

});
