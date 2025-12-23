<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center px-4">
    <div class="text-center max-w-2xl mb-12">
      <Title class="mb-4">AI Quiz Generator</Title>

      <p class="text-gray-300">
        Введіть тему або питання нижче, і наш AI згенерує для вас тестові запитання. Швидко, просто
        та ефективно!
      </p>
    </div>

    <QuestingForm v-model:topic="topic" @submit.prevent="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Title } from '@common/ui/index';
import { QuestingForm } from './components/index';

const topic = ref('');
const router = useRouter();

function handleSubmit() {
  if (topic.value) {
    router.push({ path: '/quiz', query: { topic: topic.value } });
  }
}
</script>
