<template>
    <div>
        <el-tree
            :data="menus"
            :props="defaultProps"
            :expand-on-click-node="false"
            show-checkbox
            ref="menuTree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
            <el-button v-if="node.level <=2" type="text" size="mini" @click="() => append(data)">添加</el-button>
            <el-button type="text" size="mini" @click="edit(data)">编辑</el-button>
            <el-button
                v-if="node.childNodes.length==0"
                type="text"
                size="mini"
                @click="() => remove(node, data)"
            >删除</el-button>
            </span>
            </span>
        </el-tree>
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
        >
        <el-form :model="category">
            <el-form-item label="分类名称">
            <el-input v-model="category.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图标">
            <el-input v-model="category.icon" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="计量单位">
            <el-input v-model="category.productUnit" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitData">确 定</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
export default { 
  components: {},
  props: {},
  data() {
    return {
      pCid: [],
      draggable: false,
      updateNodes: [],
      maxLevel: 0,
      title: "",
      dialogType: "", //edit,add
      category: {
        name: "",
        parentCid: 0,
        catLevel: 0,
        showStatus: 1,
        sort: 0,
        productUnit: "",
        icon: "",
        catId: null
      },
      dialogVisible: false,
      menus: [],
      expandedKey: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
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
        .then(({ data }) => {
          this.menus = data.data;
        })
        .catch(() => {});
    },
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