import { createRouter, createWebHistory } from 'vue-router';
import ListUsers from '../views/ListUsers.vue'
import UserDetail from '../views/UserDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ListUsers },
    { path: '/user/:username', component: UserDetail }
  ]
});

export default router;
