import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el enrutador

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App);
app.use(router);
app.mount('#app');
