<script setup lang="ts">
</script>

<template>
  <div class="app">
    <router-view />
  </div>
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
.app {
  width: 100vw;
  height: 100vh;
  transform-origin: 0 0;
}
</style>
