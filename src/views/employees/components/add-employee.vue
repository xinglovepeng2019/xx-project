<template>
  <el-dialog title="新增员工" :visible.sync="showDialog">
    <el-form :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          style="width: 50%"
          v-model="formData.username"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          style="width: 50%"
          v-model="formData.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          style="width: 50%"
          v-model="formData.timeOfEntry"
          placeholder="请输入入职时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          style="width: 50%"
          v-model="formData.formOfEmployment"
          placeholder="请选择"
        ></el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          style="width: 50%"
          v-model="formData.workNumber"
          placeholder="请输入工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          style="width: 50%"
          v-model="formData.departmentName"
          placeholder="请输入部门"
        ></el-input>
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker
          style="width: 50%"
          placeholder="请输入转正时间"
          v-model="formData.correctionTime"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "姓名应在1-4位",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
      },
    };
  },
};
</script>

<stylescoped>

</stylescoped>
