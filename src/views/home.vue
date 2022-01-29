<template>
    <!-- <h1>{{ msg }}</h1>
    <p>
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
        +
        <a
            href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
            target="_blank"
        >
            Vetur
        </a>
        or
        <a href="https://github.com/johnsoncodehk/volar" target="_blank"
            >Volar</a
        >
        (if using
        <code>&lt;script setup&gt;</code>)
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank">
            Vite Docs
        </a>
        |
        <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button @click="count++">count is: {{ count }}</button>
    <button @click="goto">axios</button>
    <p>
        Edit
        <code>views/home.vue</code> to test hot module replacement.
    </p> -->

    <h1>Home</h1>
    <p>
        <img src="../assets/logo.png" alt="logo" />
    </p>
    <button @click="state.count++">count is: {{ state.count }}</button>
    <Foo />
    <p class="virtual">msg from virtual module: {{ foo.msg }}</p>
    <p class="inter">this will be styled with a font-face</p>
    <p class="import-meta-url">{{ state.url }}</p>
    <p class="protocol">{{ state.protocol }}</p>
    <p class="nested-virtual">
        msg from nested virtual module: {{ virtualMsg }}
    </p>
    <Button>CommonButton</Button>
    <div>
        encrypted message:
        <p class="encrypted-msg">{{ encryptedMsg }}</p>
    </div>
    <ImportType />
</template>

<script setup>
import foo from '@foo';
import { reactive, defineAsyncComponent } from 'vue';
import { msg as virtualMsg } from '@virtual-file';
import Button from '../components/button.js';
// import { useRouter } from 'vue-router';

const ImportType = load('ImportType');
const Foo = defineAsyncComponent(() => import('../components/Foo.jsx').then(
    (mod) => mod.Foo,
));

function load(file) {
    return defineAsyncComponent(() => import(`../components/${file}.vue`));
}

const url = import.meta.env.SSR
    ? import.meta.url
    : document.querySelector('.import-meta-url')?.textContent;
const { protocol } = url ? new URL(url) : '';

const state = reactive({
    count: 0,
    protocol,
    url,
});
// export default defineComponent({
//     name: 'home',
//     props: {
//         msg: {
//             type: String,
//             required: true,
//         },
//     },
//     setup: () => {
//         const count = ref(0);
//         const router = useRouter();
//         function goto() {
//             router.push('/axios');
//         }
//         return { count, goto };
//     },
// });
</script>

<style scoped>
h1,
a {
    color: green;
}
</style>
