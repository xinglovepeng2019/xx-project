<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 角色管理 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border :data="list">
              <el-table-column type="index" label="序号" width="120">
              </el-table-column>
              <el-table-column label="名称" prop="name" width="240">
              </el-table-column>
              <el-table-column label="描述" prop="description">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <!-- row.id 角色id -->
                  <el-button type="success" @click="assignPerm(row.id)"
                    >分配权限</el-button
                  >
                  <el-button type="primary" @click="editRole(row.id)"
                    >编辑</el-button
                  >
                  <el-button type="danger" @click="deleteRole(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                layout="prev, pager, next"
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                @current-change="changePage"
              >
              </el-pagination>
            </el-row>
            <!-- 角色管理 -->
          </el-tab-pane>
          <el-tab-pane label="公司信息">配置管理</el-tab-pane>
        </el-tabs>
      </el-card>

      <!--弹层 -->
      <el-dialog title="编辑弹层" :visible.sync="showDialog">
        <el-form ref="roleForm" :model="roleForm" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="btnOk">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分配权限 -->
      <el-dialog
        title="分配权限"
        :visible="showPermDialog"
        @close="btnPermCancel"
      >
        <el-tree
          ref="permTree"
          :data="permData"
          :props="defaultProps"
          :show-checkbox="true"
          :check-strictly="true"
          :default-expand-all="true"
          :default-checked-keys="selectCheck"
          node-key="id"
        />
        <!-- 确定 取消 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="small" @click="btnPermOK"
              >确定</el-button
            >
            <el-button size="small" @click="btnPermCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getRoleList,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole,
  assignPrem,
} from "@/api/setting";
import { tranListToTreeData } from "@/utils/index";
import { getPermissionList } from "@/api/permission";

export default {
  data() {
    return {
      permData: [], //权限列表数据--树形数据
      showPermDialog: false, //分配权限控制
      defaultProps: {
        label: "name",
      },
      selectCheck: [], //选中的权限节点
      roleId: "", //角色id
      list: [], //角色列表数据

      page: {
        page: 1, //当前页码
        pagesize: 3, //每页条数
        total: 0, //总数量
      },
      // 弹层数据
      showDialog: false,
      // 接收编辑或新增的表单数据
      roleForm: {},
      rules: {
        name: [
          { required: true, $message: "角色名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async assignPerm(id) {
      //  点击分配权限 传递角色id
      // 获取权限列表数据
      this.permData = tranListToTreeData(await getPermissionList(), "0");
      // 保存当前点击的角色id
      this.roleId = id;
      // 获取选中的权限
      const { permIds } = await getRoleDetail(id);
      this.selectCheck = permIds;

      // 获取选中的权限

      this.showPermDialog = true; //分配权限弹层显示
    },
    async btnPermOK() {
      //  getCheckedKeys
      console.log(this.$refs.permTree.getCheckedKeys(), "1xx");
      await assignPrem({
        permIds: this.$refs.permTree.getCheckedKeys(),
        id: this.roleId,
      });
      this.$message.success("分配权限成功");
      this.showPermDialog = false;
    },
    btnPermCancel() {
      //  点击分配权限弹窗的关闭
      this.selectCheck = [];
      this.showPermDialog = false;
    },
    async editRole(id) {
      // 点击编辑
      // 获取当前点击的角色详情
      this.roleForm = await getRoleDetail(id);
      console.log(this.roleForm);
      // 编辑弹层显示
      this.showDialog = true;
    },
    //  点击编辑下的确定按钮
    async btnOk() {
      try {
        await this.$refs.roleForm.validate();
        // 只有验证通过的情况下，才会执行await下方的内容
        if (this.roleForm.id) {
          // 编辑
          await updateRole(this.roleForm);
        } else {
          // 新增
          await addRole(this.roleForm);
        }
        // 重新获取数据
        this.getRoleList();
        this.$message.success("操作成功");
        this.showDialog = false;
        this.roleForm = {};
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRole(id) {
      try {
        await this.$confirm("确定要删除吗？");
        await deleteRole(id);
        this.getRoleList();
        this.$message.success("删除角色成功");
      } catch (error) {
        console.log(error);
      }
    },
    changePage(newpage) {
      // newpage是当前点击的页码
      this.page.page = newpage;
      //  重新渲染数据
      this.getRoleList();
    },
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page);

      this.page.total = total;
      this.list = rows;
    },
  },
};
</script>
<style scoped></style>
