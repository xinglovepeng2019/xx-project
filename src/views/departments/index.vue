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
          <tree-tools
            slot-scope="{ data }"
            @delDepts="getDepartments"
            :tree-node="data"
            @addDepts="addDepts"
          ></tree-tools>
        </el-tree>
      </el-card>

      <add-dept
        @addDepts="addDepts"
        :tree-node="node"
        :show-dialog.sync="showDialog"
      ></add-dept>
    </div>
  </div>
</template>
<script>
import treeTools from "./components/tree-tools.vue";
import { getDepartments } from "@/api/departments.js";
import { tranListToTreeData } from "@/utils/index";
import AddDept from "./components/add-dept.vue";
export default {
  components: {
    treeTools,
    AddDept,
  },
  data() {
    return {
      company: {
        name: "丁鹿学堂组织架构",
        manager: "负责人",
        id: "",
      },
      defaultProps: {
        label: "name",
      },
      departs: [],
      showDialog: false, //弹窗组件显示隐藏
      node: null, //用来记录当前点击的部门
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    // getDialog(value) {
    //   this.showDialog = value;
    // },
    addDepts(node) {
      // 点击添加子部门
      this.showDialog = true; //显示弹窗
      // node 是当前点击的部门，要记录下来
      this.node = node;
    },
    async getDepartments() {
      let result = await getDepartments();
      console.log(result, "组织");
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
