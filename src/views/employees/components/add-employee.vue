<template>
  <el-dialog title="新增员工" :visible.sync="showDialog">
    <el-form :model="formData" :rules="rules" ref="addEmployee">
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
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
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
          @focus="getDepartments"
        ></el-input>
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          default-expand-all
          :props="{ label: 'name' }"
          @node-click="selectNode"
        >
        </el-tree>
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
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDepartments } from "@/api/departments";
import { addEmployee } from "@/api/employees";
import { tranListToTreeData } from "@/utils";
import EmployeeEnum from "@/api/constant/employees";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      EmployeeEnum, //聘用形式数据
      treeData: [], //定义数组接收树形数据 --部门数据
      showTree: false, //控制树形数据的显示隐藏
      loading: false, //控制树的显示和隐藏的进度条
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
  methods: {
    async getDepartments() {
      this.showTree = true;
      this.loading = true;
      const { depts } = await getDepartments();
      // depts转换树形数据
      this.treeData = tranListToTreeData(depts, "");
      this.loading = false;
    },
    selectNode(node) {
      // 点击tree的节点时触发
      this.formData.departmentName = node.name;
      this.showTree = false;
    },
    async btnOk() {
      // 点击确定 校验整个表单
      try {
        await this.$refs.addEmployee.validate();
        // 调用新增接口
        await addEmployee(this.formData);
        // 告诉父组件更新数据
        // this.$parent;可以直接调用到父组件的实例  就是父组件的this
        // this.$emit
        this.$parent.getEmployeeList();
        this.$parent.showDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    btnCancel() {
      // 重置原来的数据
      this.formData = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      };
      this.$refs.addEmployee.resetFields();
      this.$emit("update:showDialog", false);
    },
  },
};
</script>

<stylescoped>

</stylescoped>
