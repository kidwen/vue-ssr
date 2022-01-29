<template>
    <p>import type should be removed without side-effect</p>
</template>

<script setup lang="ts">
export interface Foo {}

// eslint-disable-next-line no-unused-vars
const msg: Foo = {};
</script>
