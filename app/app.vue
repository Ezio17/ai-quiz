<template>
  <div>
    <h1 class="text-red-500">Ai quiz</h1>
    <p>{{ store.count }}</p>
    <button @click="store.addCount">Add</button>
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from './stores/test';

const store = useTestStore();
</script>
