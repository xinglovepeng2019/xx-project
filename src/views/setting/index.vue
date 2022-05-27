<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 角色管理 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border :data="list">
              <el-table-column type="index" label="序号" width="120">
              </el-table-column>
              <el-table-column label="名称" prop=" name" width="240">
              </el-table-column>
              <el-table-column label="描述" prop="description">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button type="success">分配权限</el-button>
                  <el-button type="primary">编辑</el-button>
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
    </div>
  </div>
</template>
<script>
import { getRoleList, deleteRole } from "@/api/setting";
export default {
  data() {
    return {
      list: [], //角色列表数据
      page: {
        page: 1, //当前页码
        pagesize: 3, //每页条数
        total: 0, //总数量
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
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
