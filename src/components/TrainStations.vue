<template>
  <div class="background-container">
    <h1>旅程进度表</h1>
    <ul>
      <li v-for="station in stations" :key="station.id">
        <h2 class="myh2class">{{ station.name }}</h2>
        <p class="text-with-shadow">{{ station.desc }}</p>
        <el-button size="mini" @click="confirmArrival(station.id)">确认到站</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { apiGetStationsInfoList } from "@/api/train"
export default {
  data() {
    return {
      stations: [] // 存放车站数据的数组，初始为空
    };
  },
  methods: {
    // 模拟确认到站的操作
    confirmArrival(stationId) {
      // 在实际应用中，你可以向后端发送请求来确认到站
      alert(`确认到达 ${this.stations.find(station => station.id === stationId).name}`);
    },
    getStationsInfoList() {
        apiGetStationsInfoList().then(res => {
            console.log("stations info list res:", res)
            this.stations = res.data.obj
        })
    }
  },
  mounted() {
    this.getStationsInfoList();
  }
};
</script>

<style>
/* 样式可以根据需求自行添加 */
.background-container {
  background-image: url('https://picgorepo.oss-cn-beijing.aliyuncs.com/dragonTrain.webp'); /* 替换为你的背景图路径 */
  background-size: contain;
  background-position: center;

  background-repeat: no-repeat;
  background-attachment: fixed;
  /* 添加其他背景样式属性，例如颜色、透明度等 */
  color: white; /* 文本颜色 */
  /* 添加其他样式，如内边距、边框等 */
  padding: 20px;
  /* 设置容器高度，以适应背景图内容 */
  min-height: 100vh;
}
.text-with-shadow {
  white-space: normal; /* 使用 normal 值以允许文本自动换行 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加阴影效果，可以根据需要调整阴影的偏移和颜色 */
  background-color: rgba(128, 128, 128, 0.5); /* 使用 rgba 设置半透明的灰色背景，最后一个参数控制透明度 */
  padding: 10px; /* 添加一些内边距，使文本与背景之间有间隔 */
}
.myh2class {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加阴影效果，可以根据需要调整阴影的偏移和颜色 */
  background-color: rgba(80, 80, 180, 0.6); /* 使用 rgba 设置半透明的灰色背景，最后一个参数控制透明度 */
  padding: 10px; /* 添加一些内边距，使文本与背景之间有间隔 */
}
</style>
