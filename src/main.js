import { createSSRApp } from 'vue';
import App from './App.vue';
import { createRouter } from './router.js';
import store from './store/index';

export function createApp() {
    const app = createSSRApp(App);
    const router = createRouter();
    app.use(router).use(store);
    return { app, router };
}
