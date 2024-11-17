<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const screenDom = ref(null);

onMounted(() => {
// 创建一个场景
const scene = new THREE.Scene();

// 创建一个相机
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 设置解压缩的加载器
let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/gltf/");
dracoLoader.setDecoderConfig({ type: "js" });
const loaderGltf = new GLTFLoader();
loaderGltf.setDRACOLoader(dracoLoader);
loaderGltf.load("./model/girls_01.glb", (gltf) => {
  gltf.scene.position.set(0, 0, 0);
  scene.add(gltf.scene);
});

// 创建一个PMREMGenerator以生成环境贴图
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// 使用EXRLoader加载exr图片
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/enviroment.hdr', function (envMap) {
    // hdr作为环境贴图生效，设置.mapping为EquirectangularReflectionMapping
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = envMap;
    scene.environment = envMap;
})

// 设置相机位置
camera.position.z = 15;

// 添加轨道控制器
const controls = new OrbitControls(camera, document.body);
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.05;

// 渲染场景
function animate() {
  controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
});

</script>

<template>
  <div class="home">
    <div class="canvas-container" ref="screenDom"></div>
  </div>
</template>

<style scoped>
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
