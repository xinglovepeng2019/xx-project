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
      } else if (type === "edit") {
        // 编辑
      } else {
        // 删除
      }
    },
  },
};
</script>

<style scoped></style>
