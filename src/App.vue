<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div id="app"> 
    <v-app> <Navbar /> 

      <v-main class="app-main-content"> 
          <RouterView/>
      </v-main>
      <v-footer app class="text-center"> 
        <span class="text-caption">© 2025 My Personal Library Tracker</span>
      </v-footer>
    </v-app> 
  </div>
</template>
