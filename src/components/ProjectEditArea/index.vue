<template>
  <div class="project-edit-area-container">
    <!-- 项目名称 -->
    <div class="project-title project-block">
      <span>*项目名称</span>
      <el-input v-model="form.name" placeholder="请输入内容"></el-input>
    </div>

    <!-- 项目描述 -->
    <div class="project-desc project-block">
      <span>*项目描述 (每一项描述以分号间隔)</span>
      <el-input v-model="form.description" placeholder="请输入内容"></el-input>
    </div>

    <!-- 项目链接 -->
    <div class="project-desc project-block">
      <span>*项目链接</span>
      <el-input v-model="form.url" placeholder="请输入内容"></el-input>
    </div>

    <!-- 项目github地址 -->
    <div class="project-github project-block">
      <span>*github地址</span>
      <el-input v-model="form.github" placeholder="请输入内容"></el-input>
    </div>

    <!-- 项目预览图 -->
    <div class="project-pic project-block">
      <span>项目预览图</span>
      <UploadImg v-model="form.thumb" />
    </div>

    <!-- 项目等级 -->
    <div class="project-level project-block">
      <span>*项目等级</span>
      <el-select
        v-model="form.order"
        placeholder="请选择等级"
        @change="changeHandle"
      >
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </div>

    <!-- 发布按钮 -->
    <div class="project-btn project-block">
      <el-button type="primary" @click="projectConfirmHandle">
        {{ btnName }}
      </el-button>
    </div>
  </div>
</template>

<script>
import UploadImg from "@/components/UploadImg";
import { addProject, editProject } from "@/api/project.js";

export default {
  props: {
    form: {
      type: Object,
      default: () => ({
        name: "", //项目名称
        description: "", //项目描述
        url: "", //项目链接
        github: "", //github地址
        thumb: "", //项目预览图
        order: "1", //选择等级,默认 1
      }),
    },
    mode: {
      type: String,
    },
    btnName: {
      type: String,
    },
  },
  components: {
    UploadImg,
  },
  methods: {
    projectConfirmHandle() {
      let dataObj = {
        name: this.form.name,
        description: this.form.description.split(";"), //转变成数组
        url: this.form.url,
        github: this.form.github,
        thumb: this.form.thumb,
        order: parseInt(this.form.order),
      };
      if (this.mode === "edit") {
        editProject(this.form.id, dataObj).then(() => {
          this.$message.success("修改成功");
          this.$emit("editSuccess");
        });
      } else {
        addProject(dataObj).then(() => {
          this.$message.success("发布成功");
          this.$router.push({ name: "ProjectsList" }); //跳转到项目列表
        });
      }
    },
    //等级下拉选项的值改变后触发
    changeHandle() {
      this.$forceUpdate(); //强制渲染,以同步当前ui和数据
    },
  },
};
</script>

<style lang="scss" scoped>
.project-block {
  margin-bottom: 15px;
  span {
    display: block;
    margin: 15px 0;
    font-weight: 100;
  }
}
</style>