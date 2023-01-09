<template>
    <div>
      <el-tree :data="menus" :props="defaultProps" 
      @node-click="handleNodeClick"></el-tree>

    </div>
</template>

<script>
export default { 
  components: {},
  props: {},
  data() {
    return {
      menus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getMenus() {
      this.$axios({
        url: "https://picgorepo.oss-cn-beijing.aliyuncs.com/family_data/jiapu.json",
        method: "get"
      })
        .then(resp => {
          console.log("resp:::", resp.data.children)
          this.menus = resp.data.children
        })
        .catch(() => {});
    },
    handleNodeClick(data) {
      console.log(data)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getMenus();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style>
</style>