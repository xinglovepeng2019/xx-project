<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col>
            <span>丁鹿学堂科技</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down"></i> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
