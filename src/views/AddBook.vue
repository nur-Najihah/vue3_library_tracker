<script setup lang="ts">
import {useAddBook} from '../composable/useBook';

import { ref} from 'vue';
/*import type { Book } from '../interface/Book'; 
import { useRouter } from 'vue-router'; 
import { useToast } from 'vue-toastification'; 
import axios from 'axios'; 

const router = useRouter(); 
const toast = useToast();   

const form = reactive ({
  title: '',
  author: '',
  genre: '',
  description: '',
  status: 'Want to Read', // Set default status first
});

// Options for the status dropdown
const statusOptions = ['Reading', 'Completed', 'Want to Read'];

const handleSubmit = async () => {
  const newBook = {
    title : form.title,
    author : form.author,
    genre : form.genre,
    description : form.description,
    status : form.status,
  }

  try {
      const response = await axios.post('/api/books', form);
      toast.success('Book Updated Successfully');
      router.push(`/books/${response.data.id}`);
    } catch (error) {
      console.error('Error add book', error);
      toast.error('Book Was Not Added');
    }
};*/

const { form, formRef, rules, statusOptions, handleSubmit } = useAddBook();
</script>

<template>
  <v-container class="py-10">
    <v-card class="pa-6" elevation="2">
      <v-card-title class="text-h5 font-weight-bold">Add New Book</v-card-title>

      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.title"
            label="Book Title"
            :rules="rules.title"
            required
            class="mb-4"
            prepend-icon="mdi-book-open-blank-variant"
          />

          <v-text-field
            v-model="form.author"
            label="Author"
            :rules="rules.author"
            required
            class="mb-4"
            prepend-icon="mdi-account"
          />

          <v-text-field
            v-model="form.genre"
            label="Genre"
            required
            class="mb-4"
            prepend-icon="mdi-tag-multiple"
          />

          <v-textarea
            v-model="form.description"
            label="Description"
            :rules="rules.description"
            required
            rows="3"
            class="mb-4"
            prepend-icon="mdi-script-text-outline"
          />

          <v-select
            v-model="form.status"
            :items="statusOptions"
            label="Status"
            :rules="rules.status"
            required
            class="mb-4"
            prepend-icon="mdi-bookmark"
          />

          <v-btn
            type="submit"
            color="green"
            class="mt-4"
          >
            Submit Book
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>