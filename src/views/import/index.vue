<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from "@/api/employees";
export default {
  data() {
    return {
      // 为了让这个页面可以服务更多的导入功能，我们可以在页面中用参数来判断，是否导入员工
      type: this.$route.query.type, //user
    };
  },
  methods: {
    async success({ header, results }) {
      // header中的数据 是中文 results中的数据也是中文
      // 新增的员工的属性是一致的
      // username  姓名
      // mobile 手机号
      // formOfEmployment 聘用形式
      // workNumber  工号
      // departmentName  部门
      //  timeOfEntry: "",  入职
      //   correctionTime: "", 转正
      if (this.type === "user") {
        const userRelations = {
          入职日期: "timeOfEntry",
          手机号: "mobile",
          姓名: "username",
          转正日期: "correctionTime",
          工号: "workNumber",
        };
        const arr = [];
        // 遍历所有的数组
        results.forEach((item) => {
          // 需要将每一条数据里面的中文都换成英文
          const userInfo = {};
          Object.keys(item).forEach((key) => {
            // key是当前的中文名  找到对应的英文明
            if (
              userRelations[key] === "timeOfEntry" ||
              userRelations[key] === "correctionTime"
            ) {
              userInfo[userRelations[key]] = new Date(
                this.formDate(item[key], "/")
              );
              return;
            }
            userInfo[userRelations[key]] = item[key];
          });
          arr.push(userInfo);
          console.log(arr, "arr");
        });
        await importEmployee(arr);
        this.$router.back();
      }
    },
    // 转化excel的日期格式
    formDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>

<style scoped></style>
