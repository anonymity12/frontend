<template>
  <div style="height: 100vh;">
    <i class="el-icon-refresh-right" style="color: #00FF00; font-size:20px; margin-top: 2px; float: right;" @click="changeBubble"></i>
    <div v-for="starBubble in starBubbles" :key="starBubble.id">
      <StarImageCircle :imageSrc="starBubble.imageSrc" @click="handleCanvasClick" :size="50"/>
    </div>
  </div>
</template>

<script>
import StarImageCircle from '@/components/StarImageCircle.vue';

export default {
  name: 'StarBubbleBay',
  data() {
    return {
      bubbles: [],
      showDialog: false,
      dialogMessage: '',
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      bubbleImageSrc: require('../assets/starSmile.jpg'),
      bubbleImageLoaded: false,
      starBubbles: [
        {
          id: 1,
          imageSrc: require('../assets/pinkDragonPixel1.png')
        },
        {
          id: 2,
          imageSrc: require('../assets/pinkDragonPixel1.png')
        },
      ]
    };
  },
  mounted() {

  },
  components: {
      StarImageCircle
  },
  methods: {
    changeBubble() {
      this.starBubbles = [
        {
          id: Math.random() * 10,
          imageSrc: require('../assets/pinkDragonPixel1.png')
        },
        {
          id: Math.random() * 10,
          imageSrc: require('../assets/pinkDragonPixel1.png')
        },
        {
          id: Math.random() * 10,
          imageSrc: require('../assets/pinkDragonPixel2.png')
        },
      ]
    },
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      this.ctx = canvas.getContext('2d');
    },
    onImageLoad() {
      this.bubbleImageLoaded = true;
      this.createBubbles();
      requestAnimationFrame(this.animate);
    },

    createBubbles() {
      for (let i = 0; i < 20; i++) {
        this.bubbles.push(this.createBubble());
      }
    },
    createBubble() {
      const radius = Math.random() * 20 + 30;
      return {
        x: Math.random() * this.canvasWidth,
        y: this.canvasHeight + radius,
        radius: radius,
        speed: Math.random() * 2 + 1,
      };
    },
    animate() {
        if (!this.bubbleImageLoaded) return;
      const canvas = this.$refs.canvas;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.bubbles.forEach(bubble => {
        bubble.y -= bubble.speed;
        if (bubble.y + bubble.radius < 0) {
          Object.assign(bubble, this.createBubble());
          bubble.y = this.canvasHeight + bubble.radius;
        }
        this.drawBubble(bubble);
      });

      requestAnimationFrame(this.animate);
    },
    
    drawBubble(bubble) {
      const img = this.$refs.bubbleImage;
      const imgWidth = bubble.radius * 2;
      const imgHeight = bubble.radius * 2;
      this.ctx.drawImage(img, bubble.x - bubble.radius, bubble.y - bubble.radius, imgWidth, imgHeight);
    },

    handleCanvasClick(event) {
      this.showDialog = true;
      // todo 0529 should make a StarDetailDialog
    },
    closeDialog() {
      this.showDialog = false;
    },
    onResize() {
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
      this.initCanvas();
    }
  },
};
</script>

<style scoped>
canvas {
  display: block;
}
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
