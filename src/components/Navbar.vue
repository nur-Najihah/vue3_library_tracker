<script setup lang="ts">

import { ref } from 'vue'; // Import ref for search query
import { RouterLink, useRoute, useRouter } from 'vue-router';
import logo from '../assets/img/logo.png'; 

const isActiveLink = (routePath: string) => {
  const route = useRoute();
  return route.path === routePath;
};

const searchQuery = ref('');
const router = useRouter();

const applyFilters = () => {
const query: { q?: string;} = {};
  if (searchQuery.value) {
    query.q = searchQuery.value; // For title/author/genre 
  }
  router.push({ path: '/books', query: query });
};
</script>

<template>
  <v-app-bar app color="indigo-lighten-1" dark> 
    <v-img :src="logo" alt="Library Tracker Logo" max-height="35" max-width="auto" contain class="flex-shrink-0" ></v-img>

    <v-container class="d-flex align-center"> 
      <RouterLink class="d-flex align-center text-decoration-none mr-4 flex-shrink-0" to="/">
        <!-- <v-img :src="logo" alt="Library Tracker Logo" max-height="35" max-width="auto" contain class="flex-shrink-0" ></v-img>-->
        <v-toolbar-title  class="ml-2"> 
          <span class="ml-2 text-h6 font-weight-bold ">My Personal Library Tracker</span>
        </v-toolbar-title>
      </RouterLink>

      <v-spacer></v-spacer> 


     <!-- Search Field -->
        <v-col cols="4" class="d-flex align-center">
          <v-text-field
            v-model="searchQuery"
            label="Search by Books, Author or Genre"
            single-line
            hide-details
            clearable
            density="compact"
            variant="solo"
            class="mr-2"
            @keyup.enter="applyFilters"
            append-inner-icon="mdi-magnify" @click:append-inner="applyFilters"
          />
          <!-- <v-icon>mdi-magnify</v-icon>-->
        </v-col>

      <div class="d-flex"> <v-btn
          text
          :class="[isActiveLink('/') ? 'indigo-lighten-3' : 'text-white', 'mx-1']"
          :to="'/'"
        >
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn
          text
          :class="[isActiveLink('/books') ? 'indigo-lighten-3' : 'text-white', 'mx-1']"
          :to="'/books'"
        >
          <v-icon>mdi-bookshelf</v-icon>
        </v-btn>

      </div>
    </v-container>
  </v-app-bar>
</template>