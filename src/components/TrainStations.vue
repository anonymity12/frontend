<template>
  <div class="background-container">
    <h1>旅程进度表</h1>
    <ul>
      <li v-for="station in stations" :key="station.id">
        <h2>{{ station.name }}</h2>
        <p>{{ station.description }}</p>
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
            this.stations = res.data
        })
    }
  },
  mounted() {
    // 模拟从后端获取车站数据，这里使用示例数据
    this.stations = [
      {
        id: 1,
        name: '车站1',
        description: '这是车站1的介绍。'
      },
      {
        id: 2,
        name: '车站2',
        description: '这是车站2的介绍。'
      },
      {
        id: 3,
        name: '车站3',
        description: '这是车站3的介绍。'
      }
      // 添加更多车站数据
    ];
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
</style>
