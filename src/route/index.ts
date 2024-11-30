import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import Layout from '../layout/index.vue';

import Websit from '../module/Websit/Websit.vue';
import Girl from '../module/Girl/Girl.vue';
import Fox from '../module/Fox/Fox.vue';

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
        path: 'girl',
        name: 'Girl',
        component: Girl,
      },
      {
        path: 'fox',
        name: 'Fox',
        component: Fox,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
