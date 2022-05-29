<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template slot="before">
          <span>共16条记录</span>
        </template>
        <template slot="after">
          <el-button size="small" @click="$router.push('/import?type=user')"
            >excel导入</el-button
          >
          <el-button size="small" @click="exportData">excel导出</el-button>
          <el-button size="small" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column
          label="姓名"
          sortable
          prop="username"
        ></el-table-column>
        <el-table-column label="头像"></el-table-column>
        <el-table-column
          label="工号"
          prop="workNumber"
          sortable
        ></el-table-column>
        <!-- formatter	用来格式化内容 -->
        <el-table-column
          label="聘用形式"
          prop="formOfEmployment"
          sortable
          :formatter="formatEmployment"
        ></el-table-column>
        <el-table-column
          label="部门"
          prop="departmentName"
          sortable
        ></el-table-column>
        <el-table-column label="入职时间" prop="timeOfEntry" sortable>
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="账号状态"
          prop="enableState"
          sortable
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button
            >
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
          @current-change="changepage"
        ></el-pagination>
      </el-row>
    </div>

    <!-- sync修饰符是子组件改变父组件的数据的一个语法糖 -->
    <add-employee :show-dialog.sync="showDialog"></add-employee>
  </div>
</template>
<script>
import { getEmployeeList } from "@/api/employees";
import AddEmployee from "./components/add-employee.vue";
import { formatDate } from "@/filters/index";
import EmployeeEnum from "@/api/constant/employees";
export default {
  components: {
    AddEmployee,
  },
  data() {
    return {
      showDialog: false, //控制弹层的显示隐藏
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
    };
  },
  created() {
    this.getEmployeeList();
  },
  methods: {
    formatEmployment(row, column, cellValue, index) {
      //  格式化聘用形式
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "未知";
    },
    changepage(newpage) {
      this.page.page = newpage;
      this.getEmployeeList();
    },
    async getEmployeeList() {
      let { total, rows } = await getEmployeeList(this.page);
      this.page.total = total;
      this.list = rows;
    },
    // 导出excel
    exportData() {
      // 表头对应的关系
      const headers = {
        姓名: "username",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };

      // 按需加载
      import("@/vendor/Export2Excel").then(async (excel) => {
        // 重新获取所有的数据
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total,
        }); //[{}]  ==>  [[],[]]
        const data = this.formatJson(headers, rows);
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: "员工工资",
          autoWidth: true,
          bookType: "xlsx",
        });
      });
    },
    formatJson(headers, rows) {
      // [{username:"张三"}]  ==>  [['张三'],[]]
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === "timeOfEntry" ||
            headers[key] === "correctionTime"
          ) {
            return formatDate(item[headers[key]]); //返回一个格式化之前的时间
          } else if (headers[key] === "formOfEmployment") {
            var en = EmployeeEnum.hireType.find(
              (obj) => obj.id === item[headers[key]]
            );
            return en ? en.value : "未知";
          }
          return item[headers[key]];
        });
      });
    },
  },
};
</script>
<style scoped></style>
