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
      ],
      waveParams: {
        speed: 0.02,    // 波动速度
        amplitude: 0.2, // 波动幅度  
        frequency: 2    // 波动频率
      },
      cardConfig: {
        width: 1.5,     // 卡牌宽度
        height: 2,      // 卡牌高度
        spacing: 2      // 卡牌间距
      }
    };
  },
  mounted() {
    this.initThreeJS();
  },
  methods: {
    // 在 initThreeJS 方法中替换原有立方体代码为：
    initThreeJS() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, 300);
      renderer.setClearColor(0x000000, 0); // 透明背景

      // 创建卡牌容器
      const cardContainer = this.$refs.cardContainer
      cardContainer.innerHTML = ''
      cardContainer.appendChild(renderer.domElement);

      // 创建卡牌组
      this.cards = Array.from({ length: 5 }, (_, i) => {
        // 卡牌几何体
        const geometry = new THREE.PlaneGeometry(1.5, 2);

        // 魔力波动材质
        const material = new THREE.MeshStandardMaterial({
          color: 0x3498db,
          metalness: 0.7,
          roughness: 0.2,
          emissive: 0x1a5276,
          transparent: true
        });

        const card = new THREE.Mesh(geometry, material);
        card.position.x = (i - 2) * 2; // 水平排列
        card.userData.id = i; // 存储卡牌ID

        // 添加光晕效果
        const glowGeometry = new THREE.PlaneGeometry(1.6, 2.1);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0x5dade2,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        card.add(glow);

        scene.add(card);
        return card;
      });

      // 灯光设置
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      camera.position.z = 8;

      // 波动动画参数
      this.waveParams = {
        speed: 0.02,
        amplitude: 0.2,
        frequency: 2
      };

      // 点击事件处理
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onClick = (event) => {
        // 计算鼠标标准化坐标
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // 射线检测
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(this.cards);

        if (intersects.length > 0) {
          const card = intersects[0].object;
          card.material.emissive.setHex(0xff0000); // 点击高亮
          setTimeout(() => card.material.emissive.setHex(0x1a5276), 200);

          // 触发卡牌点击事件（示例：弹出详情）
          this.$emit('card-selected', card.userData.id);
        }
      };
      renderer.domElement.addEventListener('click', onClick);

      // 动画循环
      const animate = () => {
        requestAnimationFrame(animate);

        this.cards.forEach((card, index) => {
          // 魔力波动效果
          const wave = Math.sin(Date.now() * this.waveParams.speed + index)
            * this.waveParams.amplitude;
          card.position.y = wave;
          card.rotation.z = wave * 0.2;

          // 光晕呼吸效果
          card.children[0].material.opacity = 0.3 + Math.abs(wave) * 0.7;
        });

        renderer.render(scene, camera);
      };
      animate();

      // 窗口大小调整处理
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / 300;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, 300);
      });

      // 组件销毁时清理
      this.$once('hook:beforeDestroy', () => {
        renderer.domElement.removeEventListener('click', onClick);
        window.removeEventListener('resize');
        renderer.dispose();
      });
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
