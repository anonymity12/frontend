<!-- BottomNavigation.vue -->
<template>
    <el-menu class="bottom-navigation" mode="horizontal" :default-active="activeTab" @select="handleTabSelect">
        <el-menu-item index="home">主页</el-menu-item>
        <el-menu-item index="square">广场</el-menu-item>
        <el-menu-item index="tasks">任务</el-menu-item>
        <el-menu-item index="profile">我</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'home' // 默认选中的标签
        };
    },
    methods: {
        handleTabSelect(index) {
            // 处理标签选中事件
            // 在这里你可以触发相应的路由或其他操作
            console.log('选中标签:', index);
            // 更新当前选中的标签
            this.activeTab = index;

            // 根据选中的标签进行路由跳转
            switch (index) {
                case 'home':
                    this.$router.push('/');
                    break;
                case 'square':
                    this.$router.push('/square');
                    break;
                case 'tasks':
                    this.$router.push('/tomato');
                    break;
                case 'profile':
                    this.$router.push('/profile');
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style scoped>
.bottom-navigation {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
