<template>
  <div class="min-h-screen">
    <NuxtLoadingIndicator />

    <Toast />

    <NuxtPage />
  </div>
</template>

<script setup lang="tsx">
import { Toast } from '@common/components';
</script>
