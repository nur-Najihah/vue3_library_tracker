<script setup lang="ts">
import { RouterLink } from 'vue-router';
import {ref, computed } from 'vue';

import type { Book } from '../interface/Book'; 
const props = defineProps<{ book: Book }>();
const showFullDescription = ref(false);

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const truncatedDescription = computed(() => {
  const desc = props.book.description;
  // Check if description exists 
  if (!desc) return '';
  return showFullDescription.value || desc.length <= 50 ? desc : desc.slice(0, 60) + '...';
});
</script>

<template>
  <v-card class="pa-4 mb-4" elevation="2">
    <v-card-title class="text-h6 text-blue-darken-4 ">{{ book.title }}</v-card-title>
    <v-card-subtitle class="text-subtitle-2 text-grey-darken-1">
      <div> by {{ book.author }}</div>
      <div> Genre : {{ book.genre }}</div>
    </v-card-subtitle>

    <v-card-text>
      <div class="d-inline"> {{ truncatedDescription }}
        <span 
          v-if="props.book.description && props.book.description.length > 60"
          @click="toggleFullDescription"
          class="text-caption text-deep-purple-accent-2 ml-1" style="cursor: pointer;" >
          {{ showFullDescription ? 'Less' : 'More' }}
        </span>
      </div>
    </v-card-text>

    <v-card-actions>
      <span class="text-caption text-grey-darken-1">
        <v-icon icon="mdi-bookmark" class="mr-1 justify-start"></v-icon>
        <span class="font-weight-bold">{{ book.status }}</span>
      </span>
      <RouterLink :to="`/books/${book.id}`">
        <v-btn color="cyan-darken-3" variant="elevated" class="justify-end">View Details</v-btn>
      </RouterLink>
    </v-card-actions>
  </v-card>
</template>