<template>
    <div id="building">
      <div id="time-line">
        <span>蝴蝶谷编年史</span>
        <el-tag > {{items.length}} 条记录</el-tag>
        <div class="item" v-for="item in items" :key="item.createTime">
            <div class="item-index">{{ item.createTime | formatDate }}</div>
            <div class="item-content">{{ item.content }}</div>
        </div>
    </div>
    </div>

</template>

<script>

export default {
    name: "PostLine",
    data() {
        return {
            items: [],
            record: {
                createTime: '',
                content: ''
            },
            selectHappy: "2"
        }
    },
    mounted() {
        this.initPostLine();
    },
    methods: {
        initPostLine() {
            var allPostsUrl = 'http://101.43.166.211:8081/posts/all'
            this.$axios.get(allPostsUrl).then(res => {
                console.log("request for all posts: " + allPostsUrl)
                this.items = res.data
            })
            console.log("methods: initPostLine ok");
        },
        sendRecord() {
            if (this.content == '') {
                this.$alert('记录内容不能为空', '抱歉', {
                    confirmButtonText: '确定'
                });
            } else {
                this.postRequest('/setting/newItem', this.record).then(resp => {
                    console.log("server ret: ", resp)
                    if (resp.status == 200) {
                        this.initTimeline()
                    } else {
                        this.$alert('提交失败', '警告', {
                            confirmButtonText: '好吧'
                        })
                    }
                })
            }

        }
    },
    filters: {
        formatDate: function (time) {
            let date = new Date(time)
            let y = date.getFullYear()
            let m = date.getMonth() + 1
            if (m < 10) {
                m = "0" + m
            }
            let d = date.getDate()
            if (d < 10) {
                d = "0" + d
            }
            let h = date.getHours()
            let min = date.getMinutes()
            let s = date.getSeconds()
            if (s < 10) {
                s = "0" + s
            }

            return "" + y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s;
        }
    }
}
</script>

<style scoped>

#building {
    background-image: url(https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-12-09-16-11-15.png);
    width:100%;			 
    height:100%;			 
    position:fixed;
    background-size:100% 100%;
}
.item {
    margin-left: 30px;
    /*用左边margin显示时间线*/
    width: calc(100% - 30px);
    /*因为左边部分用于显示时间线，所以右边部分减去30px*/
    height: auto;
    /*高度由内容决定*/
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;
}
/* this is the circle  */
.item::before {
    content: "";
    width: 11px;
    height: 11px;
    border-radius: 100%;
    background-color: #91c2fc;
    position: absolute;
    left: -15px;
}
/* this is the line */
.item::after {
    content: "";
    width: 3px;
    height: calc(100% + 10px);
    /*加上10px是item底部的margin*/
    background-color: #91c2fc;
    position: absolute;
    top: 0;
    left: -11px;
}

.item-index {
    line-height: 12px;
    font-size: 12px;
    position: relative;
    color: #656565;
}

.item-content {
    color: #696969;
    width: 100%;
    height: auto;
    /*由内容决定*/
    position: relative;
    white-space: pre-wrap;
    /*保留空白符序列，但是正常地进行换行*/
    word-wrap: break-word;
    /*在长单词或 URL 地址内部进行换行*/
}

.item:hover::before {
    transform: scale3d(1.2, 1.2, 1);
    background-color: #569ffb;
}

.item:hover::after {
    transform: scale3d(1.1, 1, 1);
    background-color: #569ffb;
}

.item:hover .item-index {
    transform: scale3d(1, 1.1, 1);
    color: #070505;
}

.item:hover .item-content {
    color: #070505;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>