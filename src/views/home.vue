<template>
  <el-container class="home-container">
    <!--顶部-->
    <el-header style="margin-right: 15px; width: 100%">
      <span class="head-title" >人生线</span>
      <el-avatar
        style="color: #222; float: left; margin-top: 20px"
        :src="this.$store.state.user.userface"
        :size="50"
        ></el-avatar
      >
      <span style="color: #222; padding-top: 20px;float: left;font-weight: bold;font-size: 20px; margin: 8px">{{ this.$store.state.user.cname }}</span>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="20%">
        <el-menu
          :default-active="$route.path"
          router
          text-color="black"
          active-text-color="red"
        >
          <el-menu-item
            v-for="(item, i) in navList"
            :key="i"
            :index="item.name"
          >
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { pingpong } from "@/api/user";
export default {
  name: "Home",
  data() {
    return {
      navList: [
        { name: "/index", title: "蝴蝶列表页", icon: "el-icon-s-home" },
        { name: "/user", title: "用户管理",icon:"el-icon-s-custom" },
      ],
    };
  },
  methods: {
    ping() {
      var _this = this;
      pingpong().then((resp) => {
        console.log("wow ping return: ", resp)
      })
    }
  }
};
</script>

<style >
.nav-logo {
  position: absolute;
  padding-top: -1%;
  left: 5%;
  font-size: 40px;
}

.head-title {
  position: absolute;
  padding-top: 20px;
  right: 15%;
  font-size: 20px;
  font-weight: bold;
}


</style>
