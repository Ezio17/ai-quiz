<template>
  <form class="w-full max-w-xl flex flex-col md:flex-row gap-4">
    <input
      v-model.trim="topic"
      type="text"
      placeholder="Введіть тему або питання..."
      class="flex-1 p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <Button type="submit" class="bg-indigo-600 hover:bg-indigo-500"> Згенерувати </Button>
  </form>
</template>

<script setup lang="ts">
import { Button } from '@common/ui/index';

const topic = defineModel<string>('topic');
</script>
