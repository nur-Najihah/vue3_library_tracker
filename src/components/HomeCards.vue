<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from './AppCard.vue'; 
import Library from '../components/Library.vue'; 
import { ref, computed, onMounted } from 'vue';
import axios from 'axios'; 
import type { Book } from '../interface/Book';

const allBooks = ref<Book[]>([]); // store all books for stats calculation
const isLoadingStats = ref(true); // Loading indicator for stats section

//for book counts
const readingCount = computed(() => allBooks.value.filter(book => book.status === 'Reading').length);
const completedCount = computed(() => allBooks.value.filter(book => book.status === 'Completed').length);
const wantToReadCount = computed(() => allBooks.value.filter(book => book.status === 'Want to Read').length);
const totalBooksCount = computed(() => allBooks.value.length);

//fetch all book
onMounted(async () => {
  try {
    const response = await axios.get<Book[]>('/api/books'); 
    allBooks.value = response.data;
  } catch (error) {
    console.error('Error fetching books for stats:', error);
  } finally {
    isLoadingStats.value = false;
  }
});

</script>

<template>
  <div  class ="bg-indigo-lighten-4">
    <Library/>
    <v-container fluid> 
      <h2 class="text-h5 font-weight-bold  text-center mb-6">Your Reading Journey</h2>

      <div v-if="isLoadingStats" class="text-center-4">
        <v-progress-circular indeterminate color ="primary"></v-progress-circular>
        <p class="mt-2">Loading Statistic...</p>
      </div>
      <div v-else class="d-flex flex-wrap justify-center align-stretch"> 
        <v-card class="pa-4 flex-grow-1 mx-2 my-2" elevation="1" min-width="150" max-width="250">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">{{ readingCount }}</div>
            <div class="text-subtitle-1 text-grey-darken-1">Reading</div>
          </v-card-text>
        </v-card>
        <v-card class="pa-4 flex-grow-1 mx-2 my-2" elevation="1" min-width="150" max-width="250">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">{{ completedCount }}</div>
            <div class="text-subtitle-1 text-grey-darken-1">Completed</div>
          </v-card-text>
        </v-card>
        <v-card class="pa-4 flex-grow-1 mx-2 my-2" elevation="1" min-width="150" max-width="250">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">{{ wantToReadCount }}</div>
            <div class="text-subtitle-1 text-grey-darken-1">Want To Read</div>
          </v-card-text>
        </v-card>
        <v-card class="pa-4 flex-grow-1 mx-2 my-2" elevation="1" min-width="150" max-width="250">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">{{ totalBooksCount }}</div>
            <div class="text-subtitle-1 text-grey-darken-1">Total Books</div>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
    <v-divider class="my-4" thickness="2" color="grey-darken-3"></v-divider>

    <v-container class="my-8">
      <v-row class="pa-4" dense justify="center"> 
        <v-col cols="12" md="6">
          <Card class="bg-indigo-lighten-3">
            <v-card-title class="text-h6 font-weight-bold">Book List</v-card-title>
            <v-card-text class="mb-4">
              Explore your library and manage your books with ease.
            </v-card-text>
            <RouterLink to="/books">
              <v-btn color="black" class="text-white" rounded>
                Browse Books
              </v-btn>
            </RouterLink>
          </Card>
        </v-col>

        <v-col cols="12" md="6">
          <Card class="bg-indigo-lighten-3">
            <v-card-title class="text-h6 font-weight-bold">Add New Book</v-card-title>
            <v-card-text class="mb-4">Add your books and start building your personal library.</v-card-text>
            
            <RouterLink to="/books/add">
              <v-btn color="black" class="text-white" rounded>
                Add Book
              </v-btn>
            </RouterLink>
          </Card>
        </v-col>
        </v-row>
        
    </v-container>
  </div>
</template>
