<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <v-container class="text-center py-10">
    <h1 class="text-h2 mb-4">404 - Page Not Found</h1>
    <p class="text-subtitle-1 mb-4">The page is does not exist.</p>
    <RouterLink to="/">
      <v-btn color="primary">Go to Home</v-btn>
    </RouterLink>
  </v-container>
</template>
