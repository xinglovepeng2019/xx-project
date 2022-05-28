<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button
        :loading="loading"
        size="mini"
        type="primary"
        @click="handleUpload"
        >点击上传</el-button
      >
    </div>
    <!-- accept	接受上传的文件类型 -->
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx,.xls"
      @change="handleClick"
    />
    <div class="drop">
      <i class="el-icon-upload" />
      <span>将文件拖到此处</span>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  props: {
    onSuccess: Function,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
    handleClick(e) {
      const files = e.target.files;
      console.log(files);
      const rawFile = files[0];
      if (!rawFile) return;
      this.upload(rawFile);
    },
    async upload(rawFile) {
      // this.$refs["excel-upload-input"].value = null;
      // this.readerData(rawFile);

      let dataBinary = await this.readFile(rawFile);
      console.log(XLSX, "xlsx");
      // let workBook = XLSX.read(dataBinary, { type: "array" });
      // const firstSheetName = workBook.SheetNames[0];
      // console.log(firstSheetName, "firstSheetName");
    },
    readFile(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
      });
    },
    readerData(rawFile) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(rawFile);
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
      });
    },
  },
};
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    // display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 80px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
