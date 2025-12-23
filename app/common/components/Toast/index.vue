<template>
  <transition name="fade">
    <div
      v-if="toast.visible"
      :class="[
        'fixed top-8 right-8 p-4 z-50 rounded-md font-bold min-w-[200px] flex justify-between items-center shadow-lg text-white',
        toast.type === 'success' ? 'bg-green-500' : '',
        toast.type === 'error' ? 'bg-red-500' : '',
        toast.type === 'info' ? 'bg-blue-500' : '',
      ]"
    >
      <pre> {{ toast.message }}</pre>

      <button class="ml-4 text-white text-xl" @click="toastStore.hide">×</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useToastStore } from './store';

const toastStore = useToastStore();

const { toast } = storeToRefs(toastStore);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
