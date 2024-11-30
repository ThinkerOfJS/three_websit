<script setup lang="ts">
import { reactive } from 'vue';
interface Route {
    route: string;
    name: string;
}

const routesData: Route[] = reactive([
  {
      name: '首页',
      route: '/websit',
  },
  {
      name: '珍珠女孩',
      route: '/girl',
  },
  {
      name: '狐狸',
      route: '/fox',
  },
  {
      name: '我的',
      route: '/websit',
  },
]);

</script>

<template>
  <div class="page-header">
    <div style="display: flex; align-items: center; margin-left: 20px;">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <p>Three.js</p>
    </div>
    <div class="flex-sb-c" style="width: 180px; margin-right: 20px;">
      <router-link v-for="route in routesData" :key="route.name" :to="route.route" target="_blank">
        {{ route.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
.flex-sb-c {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a {
  font-weight: 500;
  font-size: 16px;
  color: white;
  text-decoration: inherit;
}
</style>
