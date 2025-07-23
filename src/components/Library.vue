<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Welcome to your Library Tracker',
  },
  subtitle: {
    type: String,
    default: 'Track your reading journey and explore your favorite books.',
  },
});
</script>

<template>
  <v-container fluid class="px-12 py-12 mb-1" style="background-color: #E8EAF6;"> <v-row justify="center">
      <v-col cols="10" md="10" class="text-center">
        <h1 class="text-h3 open-sans-bold mb-4 cursive-title">
          {{ title }}
        </h1>
        <p class="text-subtitle-1 cursive-subtitle">
          {{ subtitle }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.cursive-title {
  font-family: 'Caveat', cursive; 
  font-size: 7.5em; 
  line-height: 1.2; 
}

.cursive-subtitle {
  font-family: 'Caveat', cursive; 
  font-size: 1.8em; 
  opacity: 0.9; 
}
</style>