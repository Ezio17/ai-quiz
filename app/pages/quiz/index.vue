<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col items-center px-4 py-12">
    <QuizLoader v-if="pending" />

    <div v-else class="w-full flex flex-col items-center gap-6 md:w-[740px]">
      <Title v-if="topic" class="mb-4 text-center">
        Ваш квіз на тему: <span class="text-indigo-400">{{ topic }}</span>
      </Title>

      <p v-if="answersCount && isChecked" class="mb-8 text-lg">
        Правильних відповідей:
        <span class="font-semibold text-green-400"
          >{{ answersCount.correct }}/{{ answersCount.total }}</span
        >
      </p>

      <div class="w-full flex flex-col gap-6">
        <QuizQuestionCard
          v-for="(question, index) of questions"
          :key="question.id"
          v-model="userAnswers[question.id]"
          :index="index"
          :question="question"
          :is-checked="isChecked"
          :user-answers="userAnswers"
        />
      </div>

      <QuizButtons
        :is-disabled-check-btn="isChecked || pending"
        @check-answers="checkAnswers"
        @new-questions="newQuestions"
        @change-topic="changeTopic"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Title } from '@common/ui/index';
import { QuizButtons, QuizQuestionCard, QuizLoader } from './components/index';
import { useQuiz } from './composable/index';

const route = useRoute();
const router = useRouter();
const topic = ref((route.query.topic as string) || '');

const userAnswers = reactive<Record<number, string>>({});
const isChecked = ref(false);

const { questions, refresh, pending } = await useQuiz(topic.value);

const answersCount = computed(() => {
  if (!isChecked.value) return null;

  return {
    correct: questions.value.filter((q) => userAnswers[q.id] === q.correct).length,
    total: questions.value.length,
  };
});

// Buttons handlers
function checkAnswers() {
  isChecked.value = true;

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function newQuestions() {
  refresh();

  isChecked.value = false;
}

function changeTopic() {
  router.replace('/');
}
</script>

<style scoped>
@keyframes pulse-fire {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
.animate-pulse-fire {
  display: inline-block;
  animation: pulse-fire 0.8s infinite;
}

@keyframes pulse-text {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
.animate-pulse-text {
  display: inline-block;
  animation: pulse-text 1.2s infinite;
}
</style>
