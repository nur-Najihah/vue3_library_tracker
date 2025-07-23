<script setup lang="ts">
import { useUpdateBook } from '@/composable/useBook';

/*import router from '@/router';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();
const toast = useToast();
const bookId = route.params.id as string;
const statusOptions = ['Reading', 'Completed', 'Want to Read'];

const form = reactive({
  title: '',
  author: '',
  genre: '',
  description: '',
  status: '',
});

const state = reactive({
  book: {},
  isLoading: true,
});

const handleSubmit = async () => {
  try {
    const response = await axios.put(`/api/books/${bookId}`, form);
    toast.success('Book Updated Successfully');
    router.push(`/books/${response.data.id}`);
  } catch (error) {
    console.error('Error updating book', error);
    toast.error('Book Was Not Updated');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/books/${bookId}`);
    const book = response.data;
    form.title = book.title;
    form.author = book.author;
    form.genre = book.genre;
    form.description = book.description;
    form.status = book.status;
  } catch (error) {
    console.error('Error fetching book', error);
  } finally {
    state.isLoading = false;
  }
}); */

const { form, statusOptions, handleSubmit, state} = useUpdateBook();
</script>

<template>
  <div class="bg-indigo-lighten-4">
    <v-container class="py-10">
      <v-card class="pa-6 bg-indigo-lighten-5" elevation="2">
        <v-card-title class="text-h5 font-weight-bold">Edit Book</v-card-title>

        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.title"
            label="Title"
            required
            prepend-icon="mdi-book-open-blank-variant"
          />

          <v-text-field
            v-model="form.author"
            label="Author"
            required
            prepend-icon="mdi-account"
          />

          <v-text-field
            v-model="form.genre"
            label="Genre"
            required
            prepend-icon="mdi-tag-multiple"
          />

          <v-textarea
            v-model="form.description"
            label="Description"
            rows="4"
            required
            prepend-icon="mdi-script-text-outline"
          />

          <v-select
            v-model="form.status"
            :items="statusOptions"
            label="Status"
            required
            class="mb-4"
            prepend-icon="mdi-bookmark"
          />

          <v-btn
            type="submit"
            color="primary"
            class="mt-4"
          >
            Update Book
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>
