<template>
  <div
    class="bg-gray-100 text-gray-900 rounded-xl p-6 shadow-lg opacity-0 animate-fade-in"
    :style="{ animationDelay: `${index * 0.2}s` }"
  >
    <p class="font-semibold text-lg mb-4">{{ question.title }}</p>

    <div class="flex flex-col gap-2">
      <label
        v-for="(answer, i) in question.answers"
        :key="i"
        class="flex items-center gap-3 cursor-pointer rounded-md p-2 transition"
        :class="getAnswerClass(question.id, answer)"
      >
        <input
          v-model="model"
          type="radio"
          :name="'q' + question.id"
          :value="answer"
          :disabled="isChecked"
          class="accent-indigo-600"
        />

        <span>{{ answer }}</span>
      </label>
    </div>

    <p v-if="isChecked" class="mt-2 text-gray-700 italic">
      {{ question.explanation }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '@/shared/types/index';

interface Props {
  question: Question;
  index: number;
  userAnswers: Record<number, string>;
  isChecked: boolean;
}

const props = defineProps<Props>();
const { isChecked, question, index, userAnswers } = toRefs(props);

const model = defineModel<string | undefined>();

function getAnswerClass(questionId: number, answer: string) {
  if (!isChecked.value) return '';

  const { correct } = question.value;

  if (answer === question.value.correct) return 'bg-green-200 text-green-900';

  if (userAnswers.value[questionId] === answer && answer !== correct)
    return 'bg-red-200 text-red-900';

  return '';
}
</script>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  opacity: 0;
  animation-name: fadeInUp;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
</style>
