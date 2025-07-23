<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import type { Book } from '../interface/Book';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const bookId = route.params.id as string;

const book = ref<Book | null>(null);
const isLoading = ref(true);
const hasError = ref(false);

const deleteBook = async () => {
  if (confirm('Are you sure you want to delete this book?')) {
    try {
      await axios.delete(`/api/books/${bookId}`); 
      toast.success('Book Deleted Successfully!');
      router.push('/books');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book.');
    }
  }
};

const fetchBookDetails = async () => {
  isLoading.value = true;
  hasError.value = false;
  try {
    const response = await axios.get<Book>(`/api/books/${bookId}`); 
    book.value = response.data;
  } catch (error: any) {
    console.error('Error fetching book details:', error);
    toast.error('Could not load book details.');
    hasError.value = true;
    if (error.response && error.response.status === 404) {
      router.push('/not-found');
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (!bookId || typeof bookId !== 'string') {
    toast.error('Invalid Book ID.');
    router.push('/books'); // Redirect if ID invalid
    isLoading.value = false;
    hasError.value = true;
  } else {
    fetchBookDetails();
  }
});
</script>

<template>
  <div class="bg-indigo-lighten-4">
    <v-container class="py-10">
      <BackButton class="mb-4" />
      <v-card class="pa-6 bg-indigo-lighten-5" elevation="2">
        <v-card-title class="text-h5 font-weight-bold text-cyan-darken-3">
          Book Details
        </v-card-title>

        <v-card-text class="bg-indigo-lighten-5">
          <div v-if="isLoading" class="text-center py-6">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p class="mt-2">Loading book details...</p>
          </div>

          <div v-else-if="hasError" class="text-center py-6 text-red-darken-3">
            <p>Failed to load book details. Please try again.</p>
            <v-btn color="primary" class="mt-4" @click="fetchBookDetails">Retry</v-btn>
          </div>

          <div v-else-if="book">
            <v-row>
              <v-col cols="12" md="8">
                <v-card class="mb-6">
                  <v-card-text class="py-4">
                    <div class="text-grey-darken-1 mb-2">{{ book.genre }}</div>
                    <h1 class="text-h4 font-weight-bold mb-4">{{ book.title }}</h1>
                    <div class="text-grey-darken-1 mb-4">
                      <v-icon icon="mdi-account" class="mr-1"></v-icon> {{ book.author }}
                    </div>
                    <div class="text-grey-darken-1 mb-4">
                      <v-icon icon="mdi-bookmark" class="mr-1"></v-icon> Status: {{ book.status }}
                    </div>
                  </v-card-text>
                </v-card>

                <v-card>
                  <v-card-text>
                    <h3 class="text-h6 text-cyan-darken-3 font-weight-bold mb-4">
                      Description
                    </h3>
                    <p class="text-body-1">{{ book.description }}</p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card class="mb-6">
                  <v-card-title class="text-h6 font-weight-bold">Manage Book</v-card-title>
                  <v-card-text class="d-flex flex-column">
                    <RouterLink :to="`/books/update/${bookId}`" class="text-decoration-none mb-2">
                      <v-btn block color="blue" variant="elevated">
                        Edit Book
                        <v-icon>mdi-book-edit</v-icon>
                      </v-btn>
                    </RouterLink>
                    <v-btn block color="red" variant="outlined" @click="deleteBook">
                      Delete Book
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div v-else class="text-center py-6 text-orange-darken-3">
            <p>Book not found.</p>
            <RouterLink to="/books">
              <v-btn color="primary" class="mt-4">Back to Books</v-btn>
            </RouterLink>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
