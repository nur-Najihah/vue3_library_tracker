<script setup lang="ts">
import { useFecthBook } from '@/composable/useBook';
import { defineProps, onMounted, watch } from 'vue';
import { RouterLink} from 'vue-router';
import BookListing from '../components/BookListing.vue';
/*import { reactive, defineProps, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import type { Book } from '../interface/Book';
import { useFecthBook } from '@/composable/useBook';

const route = useRoute();
const allBooks = ref<Book[]>([]);

const props = defineProps({
  limit: Number,
  showButton: Boolean,
});

const state = reactive<{
  books: Book[];
  isLoading: boolean;
}>({
  books: [],
  isLoading: true,
});

const fetchAndFilterBooks = async () => {
  state.isLoading = true;
  try {
    const response = await axios.get<Book[]>('/api/books');
    allBooks.value = response.data;

    const search = route.query.q?.toString().toLowerCase() || '';

    state.books = search
      ? allBooks.value.filter(book =>
          [book.title, book.author, book.genre].some(field =>
            field?.toLowerCase().includes(search)
          )
        )
      : allBooks.value;
  } catch (error) {
    console.error('Error fetching books:', error);
  } finally {
    state.isLoading = false;
  }
}; */

const props = defineProps({
  limit: Number,
  showButton: Boolean,
});

const { state, route, fetchAndFilterBooks } = useFecthBook();
onMounted(fetchAndFilterBooks);
watch(() => route.query.q, fetchAndFilterBooks);
</script>

<template>
  <v-sheet color="indigo-lighten-4" class="py-10">
    <v-container>
      <h2 class="text-h4 font-weight-bold text-cyan-darken-2 mb-6 text-center">
        Browse Books
      </h2>

      <div v-if="state.isLoading" class="d-flex flex-column align-center justify-center py-6 text-grey">
        <v-progress-circular
          indeterminate
          color="primary"
          size="50"
          width="5"
        />
        <p class="mt-2">Loading books...</p>
      </div>

      <div v-else>
        <!-- nk return msg if no books found -->
        <div v-if="state.books.length === 0" class="text-center py-10 text-grey">
          <v-icon size="40" color="grey">mdi-book-cancel-outline</v-icon>
          <p class="mt-2">No books found matching your search.</p>
        </div>

        <v-row v-else>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="book in state.books.slice(0, props.limit || state.books.length)"
            :key="book.id"
          >
            <BookListing :book="book" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-sheet>

  <section v-if="props.showButton">
    <v-container class="my-10">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <RouterLink
            to="/books"
            class="text-decoration-none"
          >
            <v-btn color="black" block large class="text-white">
              View All Books
            </v-btn>
          </RouterLink>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
