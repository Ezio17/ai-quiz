import { defineStore } from 'pinia';
import type { ToastType, ToastState } from './types';

export const useToastStore = defineStore('toast', () => {
  const toast = reactive<ToastState>({
    message: '',
    type: 'info',
    visible: false,
  });

  let timeoutId: number | null = null;

  function show(message: string, type: ToastType = 'info', duration = 3000) {
    if (process.client) {
      toast.message = message;
      toast.type = type;
      toast.visible = true;

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        toast.visible = false;
      }, duration);
    }
  }

  function hide() {
    toast.visible = false;

    if (timeoutId) clearTimeout(timeoutId);
  }

  return { toast, show, hide };
});
