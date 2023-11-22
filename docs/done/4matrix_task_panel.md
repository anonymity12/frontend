i want 4 toggle task panel
instead of current one: just one list

finished and end @ 2023-08-13 10:34:54


## improve 

-[x] 调整任务面板的 margin ，padding， 让它显示更多文字

-[x] 分拆 lifeIndicator

---

how to finish this work?

1. 【后端】we really need to apply the task_matrix properties. for now, all tasks are in matrix 2 by default.
   later, we have 1,2,3,4 four matrix
   when we add task, we need classify the task.
   we provide a select option: this task belongs to matrix 1,2,3or4; <<7 habits of highly effecient people>>
   ? maybe we should re-define the matrix meaning:
   1: life_essential_time_task: eating, washing, purchase, family_time
   2: charge_time_task: reading, exercise, learning
   3: create_time_task: work, communication, writing, sale
   4: wasted_time_task: play game, watch TV
2. 【前端】do frontend coding.
   after decide 1, we figure out how to programming:
   ✅ VUE 实现列表的折叠效果:
   https://blog.csdn.net/xingchen678/article/details/101689387
   2.1 四象限

```html
<template>
  <div>
    <!-- 第一行，两列 -->
    <el-row>
      <el-col :span="12">
        <div class="quadrant">
          <!-- 重要且紧急 -->
          <h2>Important and Urgent</h2>
          <!-- 可以在这里添加重要且紧急的事项 -->
        </div>
      </el-col>
      <el-col :span="12">
        <div class="quadrant">
          <!-- 重要但不紧急 -->
          <h2>Important not Urgent</h2>
          <!-- 可以在这里添加重要但不紧急的事项 -->
        </div>
      </el-col>
    </el-row>

    <!-- 第二行，两列 -->
    <el-row>
      <el-col :span="12">
        <div class="quadrant">
          <!-- 不重要且紧急 -->
          <h2>Not Important and Urgent</h2>
          <!-- 可以在这里添加不重要且紧急的事项 -->
        </div>
      </el-col>
      <el-col :span="12">
        <div class="quadrant">
          <!-- 不重要且不紧急 -->
          <h2>Not Important not Urgent</h2>
          <!-- 可以在这里添加不重要且不紧急的事项 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<div class="quadrant">
  <!-- 重要但不紧急 -->
  <h2>Important not Urgent</h2>
  <div class="quadrant-content">
    <!-- 可以在这里添加重要但不紧急的事项 -->
    <div v-for="item in importantNotUrgentItems" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</div>

---
2023-07-22 17:58:34
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>

/* 在手机端媒体查询 */
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

/* 在电脑Web端媒体查询 */
@media screen and (min-width: 769px) {
  .container {
    flex-direction: row;
  }
}

2023-07-22 18:12:58
修改字体显示大小

2023-07-22 18:14:57
思考象限选择后的与后端进行代码交互的逻辑
```
---

# 添加任务

按照选择的option
发送一个 taskNewRequest 过去
taskNewRequest:
  taskTitle: "eat food"
  taskMatrix: option