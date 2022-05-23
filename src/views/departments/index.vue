<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true"></tree-tools>

        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容 插槽内容  自动循环多次  循环多个节点
        slot-scope="对象"  作用域插槽  接收传递给插槽的数据  data每个节点对象
         -->
          <tree-tools slot-scope="{ data }" :tree-node="data"></tree-tools>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>
<script>
import treeTools from "./components/tree-tools.vue";
import { getDepartments } from "@/api/departments.js";
import { tranListToTreeData } from "@/utils/index";
export default {
  components: {
    treeTools,
  },
  data() {
    return {
      company: {
        name: "丁鹿学堂组织架构",
        manager: "负责人",
      },
      defaultProps: {
        label: "name",
      },
      departs: [],
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      let result = await getDepartments();
      // console.log(result, "组织");
      // console.log(result.depts, 888);
      this.departs = tranListToTreeData(result.depts, "");
    },
  },
};
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
