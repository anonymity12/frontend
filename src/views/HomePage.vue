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
    <div v-if="selectedCard" class="card-tooltip">
      <h3>{{ selectedCard.name }} <span class="level-badge">Lv.{{ selectedCard.level }}</span></h3>
      <p class="card-description">{{ selectedCard.description }}</p>
      <div class="card-stats">
        <div class="stat">
          <span class="stat-label">力量:</span>
          <span class="stat-value">{{ Math.floor(selectedCard.power * (1 + (selectedCard.level - 1) * 0.2)) }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">升级费用:</span>
          <span class="stat-value">{{ selectedCard.cost }} 金币</span>
        </div>
      </div>
      <div class="ability-section" :class="{ 'ability-locked': selectedCard.level < selectedCard.ability.unlockLevel }">
        <h4>
          {{ selectedCard.ability.name }}
          <span v-if="selectedCard.level < selectedCard.ability.unlockLevel" class="lock-indicator">
            ({{ selectedCard.ability.unlockLevel }}级解锁)
          </span>
        </h4>
        <p>{{ selectedCard.ability.description }}</p>
      </div>
      <div class="exp-info">
        <div class="exp-bar">
          <div class="exp-progress" :style="{ width: (selectedCard.exp / selectedCard.nextExp * 100) + '%' }"></div>
        </div>
        <div class="exp-text">{{ selectedCard.exp }}/{{ selectedCard.nextExp }}</div>
      </div>
      <button @click="upgradeCard" class="upgrade-btn" :disabled="user.coins < selectedCard.cost">
        升级 ({{ selectedCard.cost }} 金币)
      </button>
    </div>
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
import { TextureLoader } from 'three';

export default {
  data() {
    return {
      user: {
        avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyIj48cGF0aCBkPSJNMTkgMjFhNyA3IDAgMSAwLTE0IDB2LTFhNCA0IDAgMCAxIDQtNGg2YTQgNCAwIDAgMSA0IDR2MXoiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4=',
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
      },
      cardsData: [
        { 
          type: 'cat', 
          name: '灵猫', 
          level: 1, 
          exp: 0, 
          nextExp: 100, 
          cost: 50,
          power: 10,
          ability: {
            name: '敏捷',
            description: '增加15%的攻击速度',
            effectValue: 15,
            unlockLevel: 2
          },
          description: '灵活的猫科动物，擅长快速攻击'
        },
        { 
          type: 'dog', 
          name: '忠犬', 
          level: 1, 
          exp: 0, 
          nextExp: 100, 
          cost: 60,
          power: 12,
          ability: {
            name: '守护',
            description: '为队友提供10%的防御加成',
            effectValue: 10,
            unlockLevel: 2
          },
          description: '忠诚的犬类，擅长保护队友'
        },
        { 
          type: 'tree', 
          name: '古树', 
          level: 1, 
          exp: 0, 
          nextExp: 100, 
          cost: 40,
          power: 8,
          ability: {
            name: '生长',
            description: '每回合恢复5点生命值',
            effectValue: 5,
            unlockLevel: 2
          },
          description: '古老的树木，拥有自我修复能力'
        },
        { 
          type: 'flower', 
          name: '奇花', 
          level: 1, 
          exp: 0, 
          nextExp: 100, 
          cost: 30,
          power: 6,
          ability: {
            name: '芬芳',
            description: '使敌人攻击力降低8%',
            effectValue: 8,
            unlockLevel: 2
          },
          description: '散发奇特香气的花朵，能够干扰敌人'
        },
        { 
          type: 'dragon', 
          name: '幼龙', 
          level: 1, 
          exp: 0, 
          nextExp: 100, 
          cost: 100,
          power: 20,
          ability: {
            name: '烈焰',
            description: '造成25%的额外火焰伤害',
            effectValue: 25,
            unlockLevel: 3
          },
          description: '强大的龙族后裔，掌握着火焰的力量'
        }
      ],
      selectedCard: null,
    };
  },
  mounted() {
    this.initThreeJS();
  },
  methods: {
    async initThreeJS() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, 300);
      renderer.setClearColor(0x000000, 0); // 透明背景

      // 创建卡牌容器
      const cardContainer = this.$refs.cardContainer;
      cardContainer.innerHTML = '';
      cardContainer.appendChild(renderer.domElement);

      // 使用HTML元素创建文本标签
      const createTextSprite = (text, color = '#ffffff', size = 1) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        
        // 设置文本样式
        context.font = `bold ${Math.floor(32 * size)}px Arial, sans-serif`;
        context.fillStyle = color;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 128, 64);
        
        // 创建纹理和精灵
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true
        });
        
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(0.5 * size, 0.25 * size, 1);
        
        return sprite;
      };

      // 加载图标
      const textureLoader = new THREE.TextureLoader();
      
      // 创建本地占位图标
      const createPlaceholderTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        context.fillStyle = '#3498db';
        context.fillRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
      };
      
      // 使用本地生成的占位图标
      const iconPlaceholder = createPlaceholderTexture();
      const icons = {
        cat: iconPlaceholder,
        dog: iconPlaceholder,
        tree: iconPlaceholder,
        flower: iconPlaceholder,
        dragon: iconPlaceholder
      };
      
      // 创建SVG图标数据URL
      const createSvgDataUrl = (svgContent) => {
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
      };
      
      // 定义SVG图标内容
      const svgIcons = {
        cat: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>`,
        dog: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`,
        tree: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>`,
        flower: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>`,
        dragon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>`
      };
      
      try {
        // 使用SVG数据URL加载图标
        icons.cat = await textureLoader.loadAsync(createSvgDataUrl(svgIcons.cat));
        icons.dog = await textureLoader.loadAsync(createSvgDataUrl(svgIcons.dog));
        icons.tree = await textureLoader.loadAsync(createSvgDataUrl(svgIcons.tree));
        icons.flower = await textureLoader.loadAsync(createSvgDataUrl(svgIcons.flower));
        icons.dragon = await textureLoader.loadAsync(createSvgDataUrl(svgIcons.dragon));
      } catch (error) {
        console.error('无法加载图标:', error);
        // 继续使用占位图标
      }
      
      // 创建卡牌组
      this.cards = [];
      
      // 为每个卡牌数据创建3D对象
      for (let i = 0; i < this.cardsData.length; i++) {
        const cardData = this.cardsData[i];
        
        // 卡牌主体
        const cardGroup = new THREE.Group();
        cardGroup.position.x = (i - 2) * this.cardConfig.spacing;
        
        // 卡牌底板 - 根据卡牌类型设置不同的基础颜色
        const cardColors = {
          cat: 0x3498db,    // 蓝色
          dog: 0x2ecc71,    // 绿色
          tree: 0x27ae60,   // 深绿色
          flower: 0xe74c3c, // 红色
          dragon: 0xf39c12  // 橙色
        };
        
        // 创建卡牌底板 - 使用磨砂玻璃效果
        const geometry = new THREE.PlaneGeometry(this.cardConfig.width, this.cardConfig.height);
        const material = new THREE.MeshPhysicalMaterial({
          color: cardColors[cardData.type] || 0x3498db,
          metalness: 0.2,
          roughness: 0.25,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          transmission: 0.5,
          thickness: 0.5,
          transparent: true,
          opacity: 0.7
        });
        const card = new THREE.Mesh(geometry, material);
        cardGroup.add(card);
        
        // 添加光晕效果 - 根据卡牌等级增加亮度
        const glowColors = {
          1: 0x5dade2,  // 基础光晕
          2: 0x3498db,  // 二级光晕
          3: 0x2980b9,  // 三级光晕
          4: 0x1abc9c,  // 四级光晕
          5: 0xf1c40f   // 五级光晕
        };
        
        const glowGeometry = new THREE.PlaneGeometry(1.6, 2.1);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: glowColors[cardData.level] || glowColors[1],
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.z = -0.1;
        cardGroup.add(glow);
        
        // 图标精灵
        const iconSprite = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: icons[cardData.type], transparent: true })
        );
        iconSprite.scale.set(0.8, 0.8, 1);
        iconSprite.position.z = 0.1;
        cardGroup.add(iconSprite);
        
        // 卡牌名称 - 使用文本精灵
        const nameText = createTextSprite(cardData.name, '#ffffff', 0.8);
        nameText.position.set(0, 0.8, 0.1);
        cardGroup.add(nameText);
        
        // 等级文本 - 使用文本精灵
        const levelText = createTextSprite(`Lv.${cardData.level}`, '#ffffff', 1);
        levelText.position.set(-0.5, 0.5, 0.1);
        cardGroup.add(levelText);
        cardData.levelText = levelText;
        
        // 能力指示器 - 显示卡牌能力是否已解锁
        const abilityIndicator = new THREE.Mesh(
          new THREE.CircleGeometry(0.1, 32),
          new THREE.MeshBasicMaterial({ 
            color: cardData.level >= cardData.ability.unlockLevel ? 0x2ecc71 : 0x7f8c8d,
            transparent: true,
            opacity: 0.8
          })
        );
        abilityIndicator.position.set(0.6, 0.8, 0.1);
        cardGroup.add(abilityIndicator);
        cardData.abilityIndicator = abilityIndicator;
        
        // 力量值显示 - 使用文本精灵
        const powerValue = Math.floor(cardData.power * (1 + (cardData.level - 1) * 0.2));
        const powerText = createTextSprite(`${powerValue}`, '#f39c12', 1);
        powerText.position.set(0.5, 0.5, 0.1);
        cardGroup.add(powerText);
        cardData.powerText = powerText;
        
        // 经验条
        const expBar = new THREE.Mesh(
          new THREE.PlaneGeometry(1.2, 0.1),
          new THREE.MeshBasicMaterial({ color: 0x4a5568 })
        );
        expBar.position.set(0, -0.7, 0.1);
        cardGroup.add(expBar);
        
        const expProgress = new THREE.Mesh(
          new THREE.PlaneGeometry(1.2 * (cardData.exp / cardData.nextExp), 0.08),
          new THREE.MeshBasicMaterial({ color: 0x48bb78 })
        );
        expProgress.position.set(-0.6 + (1.2 * (cardData.exp / cardData.nextExp)) / 2, -0.7, 0.11);
        cardGroup.add(expProgress);
        
        // 存储卡牌数据和引用
        cardGroup.userData = {
          ...cardData,
          expProgress: expProgress,
          updateExp: (newExp) => {
            cardData.exp = newExp;
            const progress = cardData.exp / cardData.nextExp;
            
            // 更新经验条
            expProgress.scale.x = progress;
            expProgress.position.x = -0.6 + (1.2 * progress) / 2;
            
            // 升级检查
            if (progress >= 1) {
              const oldLevel = cardData.level;
              cardData.level++;
              cardData.exp = newExp - cardData.nextExp;
              cardData.nextExp = Math.floor(cardData.nextExp * 1.5);
              
              // 更新等级文本
              if (cardData.levelText) {
                cardGroup.remove(cardData.levelText);
                const newLevelText = createTextSprite(`Lv.${cardData.level}`, '#ffffff', 1);
                newLevelText.position.set(-0.5, 0.5, 0.1);
                cardGroup.add(newLevelText);
                cardData.levelText = newLevelText;
              }
              
              // 更新力量值显示
              if (cardData.powerText) {
                cardGroup.remove(cardData.powerText);
                const powerValue = Math.floor(cardData.power * (1 + (cardData.level - 1) * 0.2));
                const newPowerText = createTextSprite(`${powerValue}`, '#f39c12', 1);
                newPowerText.position.set(0.5, 0.5, 0.1);
                cardGroup.add(newPowerText);
                cardData.powerText = newPowerText;
              }
              
              // 更新能力指示器颜色
              if (cardData.abilityIndicator && cardData.level >= cardData.ability.unlockLevel) {
                cardData.abilityIndicator.material.color.setHex(0x2ecc71);
              }
              
              // 更新光晕颜色
              if (glow && glowColors[cardData.level]) {
                glow.material.color.setHex(glowColors[cardData.level]);
                glow.material.opacity = 0.7; // 提高亮度
              }
              
              // 创建升级粒子效果
              const particles = new THREE.BufferGeometry();
              const particleCount = 50;
              const positions = new Float32Array(particleCount * 3);
              
              for (let i = 0; i < particleCount; i++) {
                positions[i*3] = (Math.random() - 0.5) * 0.5;
                positions[i*3+1] = (Math.random() - 0.5) * 0.5;
                positions[i*3+2] = 0;
              }
              
              particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
              
              // 根据解锁能力与否设置不同的粒子颜色
              const particleColor = oldLevel + 1 === cardData.ability.unlockLevel ? 0xf1c40f : 0xffff00;
              
              const particleSystem = new THREE.Points(
                particles,
                new THREE.PointsMaterial({ 
                  color: particleColor, 
                  size: 0.05,
                  transparent: true,
                  blending: THREE.AdditiveBlending
                })
              );
              
              particleSystem.position.copy(cardGroup.position);
              particleSystem.position.z = 0.2;
              scene.add(particleSystem);
              
              // 添加升级光环效果
              const ringGeometry = new THREE.RingGeometry(0.8, 1.0, 32);
              const ringMaterial = new THREE.MeshBasicMaterial({
                color: particleColor,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
              });
              const ring = new THREE.Mesh(ringGeometry, ringMaterial);
              ring.position.copy(cardGroup.position);
              ring.position.z = 0.15;
              scene.add(ring);
              
              // 动画效果 - 扩散并淡出
              let scale = 1.0;
              const expandRing = () => {
                scale += 0.05;
                ring.scale.set(scale, scale, 1);
                ring.material.opacity -= 0.02;
                
                if (ring.material.opacity > 0) {
                  requestAnimationFrame(expandRing);
                } else {
                  scene.remove(ring);
                  ringGeometry.dispose();
                  ringMaterial.dispose();
                }
              };
              
              expandRing();
              
              // 1秒后移除粒子系统
              setTimeout(() => {
                scene.remove(particleSystem);
                particles.dispose();
              }, 1000);
              
              // 如果解锁了能力，显示特殊效果
              if (cardData.level === cardData.ability.unlockLevel) {
                // 创建能力解锁文本
                const abilityUnlockText = createTextSprite('能力解锁!', '#f1c40f', 1.5);
                abilityUnlockText.position.copy(cardGroup.position);
                abilityUnlockText.position.y += 1.5;
                abilityUnlockText.position.z = 0.3;
                scene.add(abilityUnlockText);
                
                // 文本上升并淡出动画
                let textOpacity = 1.0;
                const animateText = () => {
                  abilityUnlockText.position.y += 0.01;
                  abilityUnlockText.material.opacity = textOpacity;
                  textOpacity -= 0.01;
                  
                  if (textOpacity > 0) {
                    requestAnimationFrame(animateText);
                  } else {
                    scene.remove(abilityUnlockText);
                    abilityUnlockText.material.map.dispose();
                    abilityUnlockText.material.dispose();
                  }
                };
                
                animateText();
              }
            }
          }
        };
        
        scene.add(cardGroup);
        this.cards.push(cardGroup);
      }

      // 灯光设置
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      camera.position.z = 8;

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
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
          // 查找被点击的卡牌
          let cardGroup = null;
          for (let i = 0; i < intersects.length; i++) {
            let obj = intersects[i].object;
            // 向上查找父级，直到找到卡牌组
            while (obj && !this.cards.includes(obj)) {
              obj = obj.parent;
            }
            if (obj) {
              cardGroup = obj;
              break;
            }
          }
          
          if (cardGroup) {
            const cardData = cardGroup.userData;
            
            // 检查金币是否足够
            if (this.user.coins >= cardData.cost) {
              // 扣除金币
              this.user.coins -= cardData.cost;
              
              // 增加经验并更新
              cardData.updateExp(cardData.exp + 20);
              
              // 高亮卡牌
              const meshes = [];
              cardGroup.traverse((child) => {
                if (child.isMesh && child.material.emissive) {
                  meshes.push(child);
                  child.material.emissive.setHex(0xff0000);
                }
              });
              
              // 恢复原始颜色
              setTimeout(() => {
                meshes.forEach(mesh => {
                  if (mesh.material.emissive) {
                    mesh.material.emissive.setHex(0x1a5276);
                  }
                });
              }, 200);
            } else {
              // 金币不足提示
              console.log('金币不足!');
            }
            
            // 显示卡牌详细信息
            this.selectedCard = cardData;
          }
        }
      };
      
      renderer.domElement.addEventListener('click', onClick);

      // 动画循环
      const animate = () => {
        requestAnimationFrame(animate);
        
        // 卡牌波动效果
        this.cards.forEach((card, index) => {
          const wave = Math.sin(Date.now() * this.waveParams.speed + index) * this.waveParams.amplitude;
          card.position.y = wave;
          card.rotation.z = wave * 0.1;
          
          // 光晕呼吸效果
          if (card.children[1] && card.children[1].material) {
            card.children[1].material.opacity = 0.3 + Math.abs(wave) * 0.5;
          }
        });
        
        renderer.render(scene, camera);
      };
      
      animate();

      // 窗口大小调整处理
      const onResize = () => {
        camera.aspect = window.innerWidth / 300;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, 300);
      };
      
      window.addEventListener('resize', onResize);

      // 组件销毁时清理
      this.$once('hook:beforeDestroy', () => {
        renderer.domElement.removeEventListener('click', onClick);
        window.removeEventListener('resize', onResize);
        
        // 清理Three.js资源
        this.cards.forEach(card => {
          card.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(m => m.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        });
        
        renderer.dispose();
        scene.dispose();
      });
    },
    upgradeCard() {
      if (this.selectedCard) {
        const cardData = this.selectedCard;
        
        // 检查金币是否足够
        if (this.user.coins >= cardData.cost) {
          // 扣除金币
          this.user.coins -= cardData.cost;
          
          // 增加经验并更新
          cardData.updateExp(cardData.exp + 20);
        } else {
          // 金币不足提示
          console.log('金币不足!');
        }
      }
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
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  min-height: 100vh;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  width: 90%;
  max-width: 500px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid white;
}

.info {
  color: white;
}

.info h2 {
  margin: 0;
  font-size: 1.2rem;
}

.info p {
  margin: 5px 0 0;
}

.card-container {
  width: 100%;
  height: 300px;
  position: relative;
  margin: 20px 0;
}

.rankings {
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 15px;
  width: 90%;
  max-width: 500px;
  color: white;
}

.rankings h3 {
  margin-top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

.rankings ul {
  list-style-type: none;
  padding: 0;
}

.rankings li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.rankings li:last-child {
  border-bottom: none;
}

.card-tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 400px;
  color: white;
}

.card-tooltip h3 {
  margin-top: 0;
}

.level-badge {
  font-size: 0.8rem;
  padding: 2px 5px;
  border-radius: 5px;
  background: #3498db;
  color: white;
  margin-left: 10px;
}

.card-description {
  margin-bottom: 20px;
}

.card-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 0.8rem;
  color: #999;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
}

.ability-section {
  margin-bottom: 20px;
}

.ability-locked {
  opacity: 0.5;
}

.lock-indicator {
  font-size: 0.8rem;
  color: #999;
}

.exp-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.exp-bar {
  width: 100%;
  height: 10px;
  background: #4a5568;
  border-radius: 5px;
  overflow: hidden;
}

.exp-progress {
  height: 100%;
  background: #48bb78;
  border-radius: 5px;
}

.exp-text {
  margin-left: 10px;
  font-size: 0.8rem;
}

.upgrade-btn {
  width: 100%;
  height: 40px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.upgrade-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
