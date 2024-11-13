<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { gsap } from 'gsap';
defineProps<{ msg: string }>();

interface Page {
    name: string;
    dec: string;
}

interface Pages {
    pages: Page[];
}

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
    100000
  );
  camera.position.set(0, 0, 10);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 将画布添加到页面中
  screenDom.value.appendChild(renderer.domElement);

  // 创建星空背景
  let url = './assets/25s.jpg';
  let envTexture = new THREE.TextureLoader().load(url);
  envTexture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = envTexture;
  scene.environment = envTexture;


  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();

  // 添加灯光
  let light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(1, 1, 1);
  scene.add(light);
  let light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(1, 1, -1);
  scene.add(light2);
  let light3 = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, 1, 1);
  scene.add(light3);

   // 设置解压缩的加载器
   let dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/gltf/");
  dracoLoader.setDecoderConfig({ type: "js" });
  let loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load("./model/xz.glb", (gltf) => {
    console.log(gltf);
    
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(3, 0, 0);
    scene.add(gltf.scene);

    window.addEventListener("mousemove", (e) => {
      let x = (e.clientX / window.innerWidth) * 2 - 1;
      let y = (e.clientY / window.innerHeight) * 2 - 1;

      let timeline = gsap.timeline();
      timeline.to(gltf.scene.rotation, {
        duration: 1,
        x: y,
        y: x,
      });
    });
  });

  loader.load("./model/xq6.glb", (gltf) => {
    console.log(gltf);
    
    gltf.scene.scale.set(0.05, 0.05, 0.05);
    gltf.scene.position.set(3, -8, 0);
    scene.add(gltf.scene);

    window.addEventListener("mousemove", (e) => {
      let x = (e.clientX / window.innerWidth) * 2 - 1;
      let y = (e.clientY / window.innerHeight) * 2 - 1;

      let timeline = gsap.timeline();
      timeline.to(gltf.scene.rotation, {
        duration: 0.5,
        x: y,
        y: x,
      });
    });
  });

  loader.load("./model/gr75.glb", (gltf) => {
    console.log(gltf);
    
    gltf.scene.position.set(3, -16, 0);
    scene.add(gltf.scene);

    window.addEventListener("mousemove", (e) => {
      let x = (e.clientX / window.innerWidth) * 2 - 1;
      let y = (e.clientY / window.innerHeight) * 2 - 1;

      let timeline = gsap.timeline();
      timeline.to(gltf.scene.rotation, {
        duration: 0.5,
        x: y,
        y: x,
      });
    });
  });

  let page = 0;
  let timeline2 = gsap.timeline();
  window.addEventListener("mousewheel", (e) => {
    if(e.wheelDelta < 0){
      page++;
      if(page > 2){
        page = 2;
      }
    }
    if(e.wheelDelta > 0){
      page--;
      if(page < 0){
        page = 0;
      }
    }
    if(!timeline2.isActive()){
      timeline2.to(camera.position, {
        duration: 1,
        y: page * -8,
      });
      gsap.to(pages.value, {
        duration: 1,
        y: -page * window.innerHeight,
      })
    }
  });

  loader.load('./model/moon.glb', (gltf) => {
    let moon = gltf.scene.children[0];
    for (let j = 0; j < 10; j++) {
      let moonInstance = new THREE.InstancedMesh(
        moon.geometry,
        moon.material,
        100,
      );
      for (let i = 0; i < 100; i++) {
        let x = Math.random() * 1000 - 500;
        let y = Math.random() * 1000 - 500;
        let z = Math.random() * 1000 - 500;

        let matrix = new THREE.Matrix4();
        let size = Math.random() * 20 - 8;
        matrix.makeScale(size, size, size);
        matrix.makeTranslation(x, y, z);
        moonInstance.setMatrixAt(i, matrix);
      }
      gsap.to(moonInstance.position, {
        duration: Math.random() * 10 + 2,
        z: -1000,
        ease: 'linear',
        repeat: -1,
      })
      scene.add(moonInstance);
    }
  });
});

</script>

<template>
  <div>
    <div class="home">
    <div class="canvas-container" ref="screenDom"></div>
    <div class="pages" ref="pages">
      <div class="page" v-for="page in pagesData.pages" :key="page.name">
        <div style="margin-left: 380px;">
          <h1 class="page-name">{{ page.name }}</h1>
          <p class="page-dec">{{ page.dec }}</p>
        </div>
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
