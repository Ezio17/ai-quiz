<template>
  <div class="w-full mt-8 flex flex-col md:flex-row gap-4 md:w-[740px]">
    <Button
      :disabled="props.isDisabledCheckBtn"
      class="bg-indigo-600 hover:bg-indigo-500 grow"
      @click="emits('checkAnswers')"
    >
      Перевірити відповіді
    </Button>

    <Button class="bg-green-600 hover:bg-green-500 grow" @click="emits('newQuestions')">
      Нові запитання
    </Button>

    <Button class="bg-yellow-600 hover:bg-yellow-500 grow" @click="emits('changeTopic')">
      Змінити тему
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@common/ui/index';

interface Props {
  isDisabledCheckBtn: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  checkAnswers: [];
  newQuestions: [];
  changeTopic: [];
}>();
</script>
