<template>
    <div>
        <el-dialog title="百宝箱" :visible.sync="boxShow.show" width="100%">
            <p>温馨提示：获得的蝴蝶越多，它们帮你找到的宝藏越多哦！</p>
                <el-table :data="gridData" height="290" >
                    <el-table-column property="date" label="发现日期" width="150"></el-table-column>
                    <el-table-column property="name" label="名字" width="200"></el-table-column>
                    <el-table-column property="address" label="地点"></el-table-column>
                    <el-table-column property="value" label="价值"></el-table-column>
                </el-table>
        </el-dialog>
    </div>

</template>
<script>
export default {
    name: 'Baibao',
    props: {
        boxShow: Object
    },
    data() {
        return {
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down', 'fill', 'contain', 'cover', 'none', 'scale-down'],
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            gridData: [{
                date: '2020-05-02',
                name: '发光石',
                address: '白银市日落大道',
                value: '¥900'
            }, {
                date: '2019-05-04',
                name: '水仙花精灵🧚‍♀️',
                address: '新疆阿拉尔市月光大道',
                value: '¥3990'
            }, {
                date: '2021-07-01',
                name: '舞蹈的小猴子🐒',
                address: '上海市普陀区金沙江路 1518 弄',
                value: '¥1990'
            }, {
                date: '2019-05-13',
                name: '昕昕的朋友天线兵的臭袜子',
                address: '北湾镇的河沟',
                value: '¥5'
            }, {
                date: '2021-08-03',
                name: '火焰彩环🔥',
                address: '小学操场北部',
                value: "¥885"
            },
            {
                date: '2012-05-13',
                name: '外星人的收音机📻',
                address: '北湾镇的山洞',
                value: '¥9999999'
            }
            ],
        }
    }
}
</script>



<style>

</style>