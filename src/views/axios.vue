<template>
    <div>{{ count }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'axios',
    setup: () => {
        const count = ref(0);
        return { count };
    },
});
</script>

<style>
</style>
