<script setup lang="ts">
import {useAddBook} from '../composable/useBook';
import { ref} from 'vue';

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
            class="mb-4"
            prepend-icon="mdi-book-open-blank-variant"
          />

          <v-text-field
            v-model="form.author"
            label="Author"
            :rules="rules.author"
            class="mb-4"
            prepend-icon="mdi-account"
          />

          <v-text-field
            v-model="form.genre"
            label="Genre"
            class="mb-4"
            prepend-icon="mdi-tag-multiple"
          />

          <v-textarea
            v-model="form.description"
            label="Description"
            :rules="rules.description"
            rows="3"
            class="mb-4"
            prepend-icon="mdi-script-text-outline"
          />

          <v-select
            v-model="form.status"
            :items="statusOptions"
            label="Status"
            :rules="rules.status"
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
