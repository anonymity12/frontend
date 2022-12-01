<template>
    <div>
        <el-dialog title="编辑蝴蝶信息" :visible.sync="dialogEdit.show">
            <el-form :model="form" ref="formEdit" :rules="formrules">
                <el-form-item label="日期" prop="date">
                    <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="名字" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="评价" prop="evaluate">
                    <el-input v-model="form.evaluate"></el-input>
                </el-form-item>

                <el-form-item label="图样" prop="image">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <img :src="item.value" style="width:20px; height:20px"/>
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <p>sldkfj</p>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'edit',
    props: {
        dialogEdit: Object,
        form: Object
    },
    data() {
        return {
            options: [
                {
                    value: 'https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-11-29-11-34-37README.png',
                    label: '蝴蝶公主'
                }, {
                    value: 'https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-11-29-11-34-29README.png',
                    label: '蝴蝶黑娃'
                },
                {
                value: 'https://picgorepo.oss-cn-beijing.aliyuncs.com/img_repo_2021-12-13-12-59-13.png',
                label: '时间大师'
                },
            ],
            value: '',
            formrules: {
                // date: [{require: true, message: "何时领养蝴蝶不能为空", trigger: "blur"}],
                name: [{require: true, message: "蝴蝶名字不能为空",  trigger: "blur" }],
            }
        }
    }

}
</script>

<style scoped>

</style>