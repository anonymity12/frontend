<template>
  <div>
    <el-dialog title="饲养新蝴蝶" :visible.sync="dialogAdd.show" width="100%">
      <el-form
        :model="formDate"
        ref="formdong"
        label-width="100px"
        :rules="formrules"
      >
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="formDate.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="请选择事情" prop="evaluate">
          <el-select v-model="formDate.evaluate" placeholder="请选择">
            <el-option
              v-for="item in evaluates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <img
                :src="item.value > 100 ? good_one : bad_one"
                style="width:20px; height:20px"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="你会得到 ：">
          <span>{{ formDate.evaluate > 100 ? "花蝴蝶" : "黑蝴蝶" }}</span>
          <img
            :src="formDate.evaluate > 100 ? good_one : bad_one"
            style="width: 30px; height: 30px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formdong')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddFly",
  props: {
    dialogAdd: Object,
    owner: ""
  },
  data() {
    return {
      formDate: {
        date: new Date(),
        evaluate: "",
        type: ""
      },
      evaluates: [
        {
          value: "99",
          label: "没有刷牙"
        },
        {
          value: "98",
          label: "吃饭不积极"
        },
        {
          value: "97",
          label: "看视频超过半个小时"
        },
        {
          value: "101",
          label: "今天刷牙了"
        },
        {
          value: "102",
          label: "画了一幅画"
        },
        {
          value: "103",
          label: "早上对爷爷说了一句早上好"
        },
        {
          value: "104",
          label: "拿起来扫把"
        },
        {
          value: "105",
          label: "我今天很开心"
        },
        {
          value: "106",
          label: "做了一件好事"
        },
        {
          value: "107",
          label: "昨天晚上我10点前睡觉了"
        },
        {
          value: "108",
          label: "晚上我刷牙了"
        },
        {
          value: "109",
          label: "我看了一会儿书"
        },
        {
          value: "110",
          label: "下午我和朋友玩了"
        },
        {
          value: "111",
          label: "跳了舞蹈"
        },
        {
          value: "112",
          label: "完成了学校的作业"
        },
        {
          value: "113",
          label: "我学了一首歌"
        },
        {
          value: "114",
          label: "我背会了古诗"
        },
        {
          value: "115",
          label: "下午我笑了3次"
        },
        {
          value: "116",
          label: "下午我画画了"
        },
        {
          value: "117",
          label: "中午好好吃饭了"
        },
        {
          value: "118",
          label: "吃饭前洗手了"
        },
        {
          value: "119",
          label: "帮奶奶扫地了"
        },
        {
          value: "120",
          label: "帮奶奶洗碗了"
        }
      ],
      good_one:
        "https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-11-29-11-34-37README.png",
      bad_one:
        "https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-11-29-11-34-29README.png",
      types: [
        {
          value:
            "https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-11-29-11-34-37README.png",
          label: "蝴蝶公主"
        },
        {
          value:
            "https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-11-29-11-34-29README.png",
          label: "蝴蝶黑娃"
        },
        {
          value:
            "https://picgorepo.oss-cn-beijing.aliyuncs.com/img_repo_2021-12-13-12-59-13.png",
          label: "时间大师"
        }
      ],
      formrules: {
        date: [
          {
            require: true,
            type: "date",
            message: "何时领养蝴蝶不能为空",
            trigger: "blur"
          }
        ],
        evaluate: [
          {
            require: true,
            type: "string",
            message: "具体事情不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    dialogFormAdd(formdong) {
      this.$refs[formdong].validate(valid => {
        if (valid) {
          var _eva = null;
          for (var item of this.evaluates) {
            if (item.value == this.formDate.evaluate) {
              _eva = item.label;
            }
          }
          var good_name_list = [
            "可爱绘画蝴蝶",
            "优美歌声蝴蝶",
            "Canada蝴蝶",
            "快乐舞蹈的蝴蝶"
          ];
          var bad_name_list = [
            "得病的蝴蝶",
            "喉咙嘶哑的蝴蝶",
            "垃圾蝴蝶",
            "悲伤的蝴蝶"
          ];
          var gen_lmt = good_name_list.length;
          var _idx = Math.floor(Math.random() * gen_lmt);
          var _name =
            this.formDate.evaluate > 100
              ? good_name_list[_idx]
              : bad_name_list[_idx];
          var myData = {
            date: this.formDate.date,
            name: _name,
            evaluate: _eva,
            image: this.formDate.evaluate > 100 ? this.good_one : this.bad_one
          };
          var add_item_url =
            "http://101.43.166.211:8081/flies/" + this.owner + "/newItem";
          this.$axios.post(add_item_url, myData).then(res => {
            this.$message({
              type: "success",
              message: "你获得了新蝴蝶！"
            });
            this.dialogAdd.show = false;
            this.$emit("update");
          });
          this.formDate = {};
        } else {
          console.log("error when submit: not valid input in form");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped></style>
