import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Layout from '../layout/index.vue';

import Websit from '../views/Websit/Websit.vue';
import Test from '../views/Test/Test.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/websit',
    component: Layout,
    children: [
      {
        path: 'websit',
        name: 'Websit',
        component: Websit,
      },
      {
        path: 'test',
        name: 'Test',
        component: Test,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
