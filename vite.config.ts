import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

const virtualFile = '@virtual-file';
const virtualId = `\0${virtualFile}`;
const nestedVirtualFile = '@nested-virtual-file';
const nestedVirtualId = `\0${nestedVirtualFile}`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        {
            name: 'virtual',
            resolveId(id) {
                if (id === '@foo') {
                    return id;
                }
                return undefined;
            },
            load(id) {
                if (id === '@foo') {
                    return 'export default {msg: 1}';
                }
                return undefined;
            },
        }, {
            name: 'virtual-module',
            resolveId(id) {
                if (id === virtualFile) {
                    return virtualId;
                }
                if (id === nestedVirtualFile) {
                    return nestedVirtualId;
                }
                return undefined;
            },
            load(id) {
                if (id === virtualId) {
                    return 'export {msg} from "@nested-virtual-file"';
                }
                if (id === nestedVirtualId) {
                    return 'export const msg = "[success] from conventional virtual file"';
                }
                return undefined;
            },
        }],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
        },
    },
    base: './', // 设置打包路径
    build: {
        minify: false,
    },
    server: {
        port: 4000, // 设置服务器启动端口号
        open: true, // 设置服务器启动时是否自动打开浏览器
        hmr: true, // 启用热更新
        cors: true, // 允许跨域
        // 设置代理,根据我们项目实际情况配置
        // proxy: {
        //   '/api': {
        //     target: 'http://www.baidu.com:8080',
        //     changeOrigin: true,
        //     secure: false,
        //     rewrite: (path) => path.replace('./api/', '/')
        //   }
        // }
    },

});
