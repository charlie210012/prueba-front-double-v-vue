import { createRouter, createWebHistory } from 'vue-router';
import ListUsers from '../views/UserDetail.vue';
import User from '../views/User.vue';

const routes = [
  {
    path: '/',
    name: 'ListUsers',
    component: ListUsers
  },
  {
    path: '/user/:username',
    name: 'User',
    component: User
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
