<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <el-checkbox-group v-model="roleIds">
      <!-- 选项 -->

      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRoleList } from "@/api/setting";
import { getUserDetailById } from "@/api/user";
import { assignRoles } from "@/api/employees";
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
    userId: {
      //当前分配角色的员工id
      type: String,
      default: null,
    },
  },
  data() {
    return {
      list: [],
      roleIds: [], //选中的角色
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async btnOk() {
      // 确定
      await assignRoles({ id: this.userId, roleIds: this.roleIds });
      // 告诉父组件关闭弹窗
      this.$emit("update:showRoleDialog", false);
    },
    btnCancel() {
      // 取消
      this.roleIds = []; //清空原来的数组
      this.$emit("update:showRoleDialog", false);
    },
    // 获取所有角色
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 });
      console.log(rows, "roles");
      this.list = rows;
    },
    // 什么时候调用？  点击员工列表的角色的时候进行调用
    async getUserDetailById(id) {
      // props数据传递是异步的
      const { roleIds } = await getUserDetailById(id);
      this.roleIds = roleIds;
    },
  },
};
</script>
