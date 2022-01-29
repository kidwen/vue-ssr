<template>
    <!-- <Home msg="Hello Vue 3 + TypeScript + Vite" /> -->
    <div>
        <router-link to="/">Home</router-link>
        <router-link to="/axios">Axios</router-link>
        <router-view v-slot="{ Component }">
            <Suspense>
                <component :is="Component" />
            </Suspense>
        </router-view>
    </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue';
// import Home from './views/home.vue';

// export default defineComponent({
//     name: 'App',
//     components: {
//         Home,
//     },
// });
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
