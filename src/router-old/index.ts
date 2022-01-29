import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/home.vue';
import Vuex from '@/views/vuex.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    }, {
        path: '/vuex',
        name: 'Vuex',
        component: Vuex,
    }, {
        path: '/axios',
        name: 'Axios',
        component: () => import('@/views/axios.vue'),
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
