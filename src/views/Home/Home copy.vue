<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { gasp } from 'gasp';
defineProps<{ msg: string }>();

interface Page {
    name: string;
    dec: string;
}

interface Pages {
    pages: Page[];
}

const count = ref(0);
const screenDom = ref(null);
const pages = ref(null);
const pagesData: Pages = reactive({
  pages: [
    {
        name: '目标',
        dec: '我们的征途是星辰大海'
    },
    {
        name: '行动',
        dec: '我们将竭尽所能'
    },
    {
        name: '最终',
        dec: '我们一定要冲出宇宙'
    }
  ]
});

onMounted(() => {
  // 创建场景
  const scene = new THREE.Scene();
  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 10);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 将画布添加到页面中
  screenDom.value.appendChild(renderer.domElement);

  // 创建星空背景
  let url = './../assets/25s.jpg';
  let envTexture = new THREE.TextureLoader().load(url);
  console.log(envTexture);
  
  scene.background = envTexture;
  scene.environment = envTexture;


  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
});

</script>

<template>
  <div class="home">
    <div class="canvas-container" ref="screenDom"></div>
    <div class="header">
      <div style="display: flex; align-items: center; margin-left: 20px;">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <p>Three.js</p>
      </div>
      <div class="flex-sb-c" style="width: 180px; margin-right: 20px;">
        <a href="https://vite.dev" target="_blank">
          首页
        </a>
        <a href="https://vite.dev" target="_blank">
          购物车
        </a>
        <a href="https://vite.dev" target="_blank">
          我的
        </a>
      </div>
    </div>
   <div class="pages" ref="pages">
    <div class="page" v-for="page in pagesData.pages" :key="page.name">
      <div style="margin-left: 180px;">
        <h1 class="page-name">{{ page.name }}</h1>
        <p class="page-dec">{{ page.dec }}</p>
      </div>
    </div>
   </div>
  </div>
</template>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  transform-origin: 0 0;
}
.canvas-container {
  width: 100vw;
  height: 100vh;
}
.flex-sb-c {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}
a {
  font-weight: 500;
  font-size: 16px;
  color: white;
  text-decoration: inherit;
}
.pages {
  position: fixed;
  top: 0;
  left: 0;
}
.page {
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>
