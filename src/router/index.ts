import { createRouter, createWebHistory } from 'vue-router'
import HomeCards from '../components/HomeCards.vue'
import BookListView from '../components/BookListView.vue';
import BookView from '@/views/BookView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import AddBook from '@/views/AddBook.vue';
import UpdateBook from '@/views/UpdateBook.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env?.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeCards,
    },
    {
      path: '/books',
      name: 'books',
      component: BookListView,
    },
    {
      path: '/books/:id',
      name: 'book',
      component: BookView,
    },
    {
      path: '/books/add',
      name: 'add-book',
      component: AddBook,
    },  
    {
      path: '/books/update/:id',
      name: 'update-book',
      component: UpdateBook,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
