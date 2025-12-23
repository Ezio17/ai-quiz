import type { QuestionResponse } from '@shared/types/index';
import { useToastStore } from '@common/components/index';
import { useRouter } from 'vue-router';
import { watchEffect, computed } from 'vue';

export async function useQuiz(topic: string) {
  const toastStore = useToastStore();
  const router = useRouter();

  const {
    data: response,
    error,
    refresh,
    pending,
  } = await useFetch<QuestionResponse>('/api/generate-quiz', {
    method: 'POST',
    body: { topic },
  });

  const questions = computed(() => response.value?.questions ?? []);

  watchEffect(() => {
    const errorMessage =
      error.value?.message || (response.value?.error ? response.value.errorMessage : '');

    if (!errorMessage) return;

    toastStore.show(
      `Сталася помилка: ${errorMessage}\n\n Перенаправлення на головну через 3 секунди.`,
      'error'
    );

    setTimeout(() => router.replace('/'), 3000);
  });

  return {
    questions,
    refresh,
    pending,
  };
}
