<template>
  <div>
    <!-- list-type	文件列表的类型	string	text/picture/picture-card	text
  action	必选参数，上传的地址	string
  limit	最大允许上传个数	number
  on-remove	文件列表移除文件时的钩子	function(file, fileList)
  on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
   -->
    <el-upload
      list-type="picture-card"
      action="#"
      :file-list="filelist"
      :limit="1"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress
      v-if="showPercent"
      :percentage="percent"
      style="width: 180px"
    ></el-progress>
    <el-dialog :visible.sync="showDialog">
      <img width="100%" :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import COS from "cos-js-sdk-v5";
// 实例化COS对象
const cos = new COS({
  SecretId: "AKIDJRJvGK7eusZ0A3ey1nJXVCbjaATVFj9I",
  SecretKey: "tWsxlPmsgDTSAajbCWaMr52i6D3bssa3",
});
export default {
  data() {
    return {
      filelist: [
        {
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ], //图片地址列表
      showDialog: false, //控制显示弹层
      imgUrl: "", //预览图片的地址
      currentFileUid: "", //记录当前正在上传的图片的uid
      showPercent: false, //控制进度条
      percent: 0, //当前的百分比
    };
  },
  computed: {
    // 控制上传数量为1
    fileComputed() {
      return this.filelist.length === 1;
    },
  },
  methods: {
    handlePreview(file) {
      // console.log(file, "file");
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    handleRemove(file, fileList) {
      // file;点击删除的文件
      // console.log(fileList, file, "filelist");
      // 把fileList中的数据也进行删除
      this.filelist = this.filelist.filter((item) => item.uid !== file.uid);
    },
    changeFile(file, filelist) {
      // 添加文件
      console.log(file);
      // console.log(filelist);
      // console.log(filelist.length);
      // 该方法会执行很多遍  不能使用push
      this.filelist = filelist.map((item) => item);
      // 上传成功  数据才可以进来===》腾讯云cos
    },
    beforeUpload(file) {
      // 定义文件类型
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      if (!types.some((item) => item === file.type)) {
        // 类型不存在
        this.$message.error("上传图片只能时 JPG GIF BMP PNG 格式");
        return false;
      }
      // 检查文件大小  1M=1024k  1k=1024B
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        this.$message.error("上传的图片大小不能大于10M");
        return false;
      }
      // 记录当前上传的图片的uid
      this.currentFileUid = file.uid;
      this.showPercent = true; //显示进度条
      return true;
    },
    // 自定义上传动作  file对象  是我们需要上传到腾讯云服务器的内容
    upload(params) {
      console.log(params.file);
      if (params.file) {
        cos.putObject(
          {
            Bucket: "jxx-1258286729" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-beijing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file
              .name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            StorageClass: "STANDARD",
            Body: params.file, // 上传文件对象
            // 进度条
            onProgress: (params) => {
              this.percent = params.percent * 100;
            },
          },
          (err, data) => {
            console.log(err || data);
            // data中有statusCode: 200 为200时候 说明上传成功
            if (!err && data.statusCode === 200) {
              // filelist 才能显示到上传组件上，此时我们要将filelist的数据的url地址变为现在上传的成功的文件的地址
              this.filelist = this.filelist.map((item) => {
                // 去找刚刚记录的uid
                if (item.uid === this.currentFileUid) {
                  // 将上传成功的地址赋值给原来的url地址
                  return { url: "http://" + data.Location, upload: true };
                  // upload: true 表示图片已经上传完毕 ，
                }
                return item;
              });
              // 2秒后进度条隐藏
              setTimeout(() => {
                this.showPercent = false; //隐藏进度条
                this.percent = 0; //进度归0
              }, 2000);
            }
          }
        );
      }
    },
  },
};
</script>
<style scoped>
/* 让样式嵌入底层 */
/deep/ .disabled .el-upload--picture-card {
  display: none;
}
</style>
