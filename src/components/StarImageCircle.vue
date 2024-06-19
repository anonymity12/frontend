<template>
  <div class="star-image-circle">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <!-- 圆形边框 -->
      <circle cx="50" cy="50" r="48" stroke="blue" stroke-width="4" fill="none" />
      
      <!-- 五角星 -->
      <polygon :points="starPoints" fill="gold" stroke="black" stroke-width="1" />

      <!-- 圆形裁剪图片 -->
      <clipPath id="clip-circle">
        <circle cx="50" cy="50" r="21" />
      </clipPath>
      <image :href="imageSrc" x="24" y="24" width="52" height="52" clip-path="url(#clip-circle)" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100
    },
    imageSrc: {
      type: String,
      required: true
    }
  },
  computed: {
    starPoints() {
      const cx = 50, cy = 50, spikes = 5, outerRadius = 45, innerRadius = 23;
      let rot = Math.PI / 2 * 1;
      let x = cx, y = cy;
      let step = Math.PI / spikes;
      let points = [];

      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy - Math.sin(rot) * outerRadius;
        points.push(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy - Math.sin(rot) * innerRadius;
        points.push(x, y);
        rot += step;
      }
      return points.join(' ');
    }
  },
  mounted() {
    var elements = document.querySelectorAll('.star-image-circle');
    elements.forEach(function(element) {
      var randomX = Math.random() * 900 - 450;
      var randomBottom = Math.random() * 20;
      element.style.setProperty('--random-x', randomX + '%');
      element.style.setProperty('--random-bottom', randomBottom + 'px');
    })
  }
};
</script>

<style scoped>
.circle-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.star-image-circle {
  position: absolute;
  bottom: var(--random-bottom);
  left: 50%;
  animation: floatUp 3s linear forwards;
}

@keyframes floatUp {
  0% {
    transform: translateY(0vh);
    transform: translateX(0vh);
  }
  1% {
    transform: translateY(-40%);
  }
  80% {
    transform: translate(var(--random-x), -400%);
  }
  100% {
    transform: translate(var(--random-x), -500%);
  }
}
</style>
