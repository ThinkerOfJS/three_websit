<script setup lang="ts">
import Home from './views/Home/Home.vue'
</script>

<template>
  <Home msg="Vite + Vue" />
</template>

<style>
*{
  margin: 0;
  padding: 0;
}

body{
  margin: 0;
  width: 100vw;
  height: 100vh;
}

canvas {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
