<template>
  <el-dialog :title="showTitle" :visible.sync="showDialog">
    <!-- 表单组件 -->
    <el-form
      ref="deptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          v-model="formData.name"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编号" prop="code">
        <el-input
          style="width: 80%"
          v-model="formData.code"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          style="width: 80%"
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :value="item.username"
            :label="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1300个字符"
          v-model="formData.introduce"
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- dialog专门放置底部操作栏得插槽   -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="submitForm('deptForm')"
          >确定</el-button
        >
        <el-button size="small" @click="resetForm('deptForm')">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import {
  getDepartments,
  getEmployeeSimple,
  addDepartments,
  getDepartDetail,
  updateDepartments,
} from "@/api/departments";
export default {
  props: {
    // 控制弹窗得显示隐藏
    showDialog: {
      type: Boolean,
      default: false,
    },
    treeNode: {
      type: Object,
      default: null,
    },
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepet = async (rule, value, callback) => {
      // value 部门名称 要去和同级别下的部门去比较  有相同不可以
      const { depts } = await getDepartments();
      // 检查重复规则，支持两种模式  新增模式/编辑模式
      // 去找同级下有没有和value相同的数据
      // 找同级下所有的子部门

      let isRepeat = false;
      if (this.formData.id) {
        // 编辑模式
        // 编辑 上海事业部  ==》除了我之外，同级部门下不能有叫上海事业部的
        isRepeat = depts
          .filter(
            (item) =>
              item.id !== this.formData.id && item.pid === this.treeNode.pid
          )
          .some((item) => item.name === value);
      } else {
        //新增模式
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.pid)
          .some((item) => item.name === value);
      }
      isRepeat
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback();
    };
    // 检查部门编号是否重复
    const checkCodeRepet = async (rule, value, callback) => {
      // value 部门名称 要去和同级别下的部门去比较  有相同不可以
      const { depts } = await getDepartments();
      // 去找同级下有没有和value相同的数据
      // 找同级下所有的子部门
      // value不能为空，因为我们的部门有可能没有code
      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts.some(
          (item) => item.id !== this.formData.id && item.code === value && value
        );
      } else {
        isRepeat = depts.some((item) => item.code === value && value);
      }

      // isRepeat 为true  找到了一样的名字

      isRepeat
        ? callback(new Error(`组织架构中已经有部门使用${value}编码`))
        : callback();
    };
    return {
      formData: {
        code: "",
        introduce: "",
        manager: "",
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1~50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkNameRepet,
          },
        ],
        code: [
          { required: true, message: "部门编号不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编号要求1~50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkCodeRepet,
          },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "部门介绍要求1~300个字符",
            trigger: "blur",
          },
        ],
      },
      peoples: [], //部门负责人
    };
  },
  computed: {
    showTitle() {
      return this.formData.id ? "编辑部门" : "新增部门";
    },
  },
  methods: {
    async getDepartDetail(id) {
      // 获取部门详细信息
      this.formData = await getDepartDetail(id);
      console.log(this.formData, "this.formData");
    },
    // 获取部门负责人数据
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple();
    },
    resetForm(formName) {
      this.formData = {
        code: "",
        introduce: "",
        manager: "",
        name: "",
      };
      //取消按钮
      this.$refs[formName].resetFields(); //重置校验字段
      this.$emit("update:showDialog", false);
    },
    submitForm(formName) {
      //新增
      this.$refs[formName].validate(async (isOk) => {
        if (isOk) {
          //  区分编辑和新增
          if (this.formData.id) {
            // 编辑模式
            await updateDepartments(this.formData);
          } else {
            // 新增模式
            // 提交
            await addDepartments({ ...this.formData, pid: this.treeNode.id });
          }
          // 告诉父组件 重新拉取数据
          this.$emit("addDepts");

          this.$emit("update:showDialog", false); //触发事件
          this.formData = {
            code: "",
            introduce: "",
            manager: "",
            name: "",
          };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
