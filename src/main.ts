import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import '@mdi/font/css/materialdesignicons.css'
const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(Toast);
app.mount('#app')
