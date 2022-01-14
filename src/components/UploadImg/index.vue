<template>
  <div class="upload-img-container">
    <!-- 标题 -->
    <div class="title">{{ uploadTitle }}</div>
    <!-- 上传控件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from "@/urlConfig.js";
export default {
  props: ["uploadTitle", "value"],
  computed: {
    imageUrl() {
      if (this.value) {
        return server_URL + this.value;
      }
    },
    // 授权
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"), //从本地获取Token,添加到headers
      };
    },
  },
  methods: {
    //上传成功回调函数
    handleAvatarSuccess(res) {
      //res.code === 0 是上传成功 , res.data有可能是null
      if (!res.code && res.data) {
        //上传成功
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style lang="scss">
.upload-img-container {
  .title {
    margin: 15px 0;
    font-weight: 100;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
</style>