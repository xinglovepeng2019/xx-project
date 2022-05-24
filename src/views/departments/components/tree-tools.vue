<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col :span="20">
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 设置下拉菜单 -->
          <!-- 
            command	点击菜单项触发的事件回调	dropdown-item 的指令
           -->
          <el-dropdown @command="operateDepts">
            <span> 操作<i class="el-icon-arrow-down"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item command="edit" v-if="!isRoot"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item command="del" v-if="!isRoot"
                >删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from "@/api/departments";
export default {
  props: {
    // 定义一个props属性
    treeNode: {
      type: Object, //对象类型
      required: true, //必须传treeNode属性
    },
    isRoot: {
      type: Boolean,
      default: false, //默认值
    },
  },
  methods: {
    operateDepts(type) {
      console.log(type, "type");
      // vue单向数据流  子传父
      if (type === "add") {
        // 添加子部门
        // 告诉父组件  显示弹窗
        // 添加子部门  需要当前部门的数据  就要传递this.treeNode
        this.$emit("addDepts", this.treeNode);
      } else if (type === "edit") {
        // 编辑
      } else {
        // 删除
        this.$confirm("确定要删除该部门吗?")
          .then(() => {
            //点击了确定进入then
            return delDepartments(this.treeNode.id); //返回promise对象
          })
          .then(() => {
            // 等待接口删除成功 后端数据变化了 前端数据再改变，重新渲染
            this.$emit("delDepts"); //通知父组件更新
            this.$message.success("删除部门成功");
          })
          .catch(() => {
            //点取消进入catch
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
  },
};
</script>

<style scoped></style>
