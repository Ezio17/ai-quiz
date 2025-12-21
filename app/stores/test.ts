import { defineStore } from 'pinia';

export const useTestStore = defineStore('test', () => {
  const count = ref(5);

  const addCount = () => {
    count.value += 1;
  };

  return { count, addCount };
});
