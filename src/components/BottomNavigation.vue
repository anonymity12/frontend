<template>
    <el-menu class="bottom-navigation" mode="horizontal" :default-active="activeTab" active-text-color="#00FF00" @select="handleTabSelect">
        <el-menu-item index="baodao">🌟星海湾</el-menu-item>
        <el-menu-item index="profile">🌞我</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'baodao' // 默认选中的标签
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
                case 'baodao':
                    this.$router.replace('/');
                    break;
                case 'square':
                    this.$router.replace('/square');
                    break;
                case 'tasks':
                    this.$router.replace('/tomato');
                    break;
                case 'profile':
                    this.$router.replace('/profile');
                    break;
                case 'shitrecord':
                    this.$router.replace('/shitrecord');
                    break;
                case 'sleeprecord':
                    this.$router.replace('/sleeprecord');
                    break;
                case 'xuanguan':
                    this.$router.replace('/xuanguan');
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
    border: 4mm rgba(211, 220, 50, .6);
    border-radius: 5%;
    position: fixed;
    bottom: 0;
    display: flex;
    font-size: 24px;
    justify-content: space-between;
    background-color: #FFF1CB;
    width: 100%;
}
</style>
