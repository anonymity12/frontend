<template>
  <div class="home-page">
    <div class="user-info">
      <img :src="user.avatar" alt="Avatar" class="avatar" />
      <div class="info">
        <h2>{{ user.name }}</h2>
        <p>金币: {{ user.coins }}</p>
      </div>
    </div>
    <div ref="cardContainer" class="card-container"></div>
    <div class="rankings">
      <h3>用户排名</h3>
      <ul>
        <li v-for="(user, index) in rankings" :key="user.id">
          {{ index + 1 }}. {{ user.name }} - 实力: {{ user.power }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  data() {
    return {
      user: {
        avatar: 'https://via.placeholder.com/150',
        name: '乖娃娃',
        coins: 1000
      },
      rankings: [
        { id: 1, name: '用户A', power: 1200 },
        { id: 2, name: '用户B', power: 1100 },
        { id: 3, name: '用户C', power: 1000 }
      ]
    };
  },
  mounted() {
    this.initThreeJS();
  },
  methods: {
    initThreeJS() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.cardContainer.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    }
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.card-container {
  width: 100%;
  height: 300px;
  position: relative;
}
.rankings {
  margin-top: 20px;
}
</style>
