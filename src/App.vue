<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div id="app"> <v-app> <Navbar /> 

      <v-main class="app-main-content"> <RouterView /> 
      </v-main>

      <v-footer class="app-footer"> <p></p>
      </v-footer>
    </v-app> </div>
</template>
