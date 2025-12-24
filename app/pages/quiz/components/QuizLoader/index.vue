<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-center">
    <span class="animate-pulse-fire mr-4">🔥</span>

    <span class="animate-pulse-text mx-2 text-4xl">Завантаження квізу</span>

    <span class="animate-pulse-fire ml-4">🔥</span>
  </div>
</template>

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
