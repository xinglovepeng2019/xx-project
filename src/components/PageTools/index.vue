<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div v-if="showBefore" class="before">
          <i class="el-icon-info"></i>
          <!-- 插槽 -->
          <slot name="before"></slot>
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.page-tools {
  margin: 10px 0;
}
.before {
  line-height: 35px;
  display: inline-block;
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid #91d5ff;
  background: #e6f7ff;
}
.before i {
  margin-right: 5px;
  color: #409eff;
}
</style>
